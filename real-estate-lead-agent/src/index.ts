import { LeadAgent } from './agent/lead-agent';
import { CronScheduler } from './scheduler/cron-scheduler';
import { validateConfig } from './config';
import { logger } from './utils/logger';

type RunMode = 'run' | 'schedule' | 'dry-run';

function getRunMode(): RunMode {
  const args = process.argv.slice(2);
  const modeArg = args.find((a) => a.startsWith('--mode='));

  if (modeArg) {
    const mode = modeArg.split('=')[1] as RunMode;
    if (['run', 'schedule', 'dry-run'].includes(mode)) {
      return mode;
    }
  }

  return 'run';
}

async function main(): Promise<void> {
  const mode = getRunMode();

  logger.info(`Real Estate Lead Agent v1.0.0`);
  logger.info(`Run mode: ${mode}`);

  try {
    // Validar configuração (exceto em dry-run que pode não ter Supabase)
    if (mode !== 'dry-run') {
      validateConfig();
    }

    switch (mode) {
      case 'run': {
        // Execução única
        const agent = new LeadAgent(false);
        const result = await agent.execute();

        if (result.errors.length > 0) {
          logger.warn(`Completed with ${result.errors.length} errors`);
          process.exit(1);
        }

        logger.info('Execution completed successfully');
        process.exit(0);
        break;
      }

      case 'schedule': {
        // Modo agendado com cron
        const scheduler = new CronScheduler();
        scheduler.start();

        // Graceful shutdown
        const shutdown = () => {
          logger.info('Shutdown signal received');
          scheduler.stop();
          process.exit(0);
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);

        // Manter processo rodando
        logger.info('Agent running in scheduled mode. Press Ctrl+C to stop.');
        break;
      }

      case 'dry-run': {
        // Modo de teste sem salvar no banco
        logger.info('Running in DRY RUN mode - no data will be saved');
        const agent = new LeadAgent(true);
        const result = await agent.execute();

        logger.info(`\nDry run results:`);
        logger.info(`  Would have found ${result.leadsFound} leads`);
        logger.info(`  Would have analyzed ${result.sitesAnalyzed} sites`);
        process.exit(0);
        break;
      }
    }
  } catch (error: any) {
    logger.error(`Fatal error: ${error.message}`);
    process.exit(1);
  }
}

main();
