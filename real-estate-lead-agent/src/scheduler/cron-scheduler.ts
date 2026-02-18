import cron from 'node-cron';
import { LeadAgent } from '../agent/lead-agent';
import { config } from '../config';
import { logger } from '../utils/logger';

export class CronScheduler {
  private task: cron.ScheduledTask | null = null;
  private isRunning: boolean = false;

  start(): void {
    const schedule = config.cron.schedule;

    if (!cron.validate(schedule)) {
      throw new Error(`Invalid cron expression: ${schedule}`);
    }

    logger.info(`Scheduling agent execution with cron: ${schedule}`);
    logger.info(`Next executions will follow the schedule: ${this.describeSchedule(schedule)}`);

    this.task = cron.schedule(schedule, async () => {
      if (this.isRunning) {
        logger.warn('Previous execution still running. Skipping this scheduled run.');
        return;
      }

      this.isRunning = true;
      logger.info('Scheduled execution triggered');

      try {
        const agent = new LeadAgent(false);
        const result = await agent.execute();

        logger.info(
          `Scheduled execution completed: ${result.leadsSaved} leads saved, ` +
            `${result.errors.length} errors`
        );
      } catch (error: any) {
        logger.error(`Scheduled execution failed: ${error.message}`);
      } finally {
        this.isRunning = false;
      }
    });

    this.task.start();
    logger.info('Scheduler started. Waiting for next scheduled execution...');
  }

  stop(): void {
    if (this.task) {
      this.task.stop();
      this.task = null;
      logger.info('Scheduler stopped');
    }
  }

  private describeSchedule(expression: string): string {
    const parts = expression.split(' ');
    if (parts.length !== 5) return expression;

    const [minute, hour, dayMonth, month, dayWeek] = parts;

    if (dayMonth === '*' && month === '*' && dayWeek === '*') {
      return `Daily at ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    }
    if (dayMonth === '*' && month === '*') {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return `Every ${dayWeek.split(',').map((d) => days[parseInt(d)] || d).join(', ')} at ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    }
    return expression;
  }
}
