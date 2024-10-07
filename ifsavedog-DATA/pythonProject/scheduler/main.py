from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

from job.sequential import *

scheduler = BackgroundScheduler()
scheduler.add_job(sequential_job_every_day, CronTrigger(hour=1, minute=0))

try:
  scheduler.start()
except (KeyboardInterrupt, SystemExit):
  print
  scheduler.shutdown()