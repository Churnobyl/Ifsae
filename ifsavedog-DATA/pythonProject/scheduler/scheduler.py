from apscheduler.schedulers.blocking import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime
from scheduler.inputMongo import input_data_to_mongo
from scheduler.calculate_character import calculate_character_score
import time

scheduler = BackgroundScheduler()
scheduler.add_job(input_data_to_mongo, CronTrigger(hour=1, minute=0))
scheduler.add_job(calculate_character_score, CronTrigger(hour=1, minute=0))
scheduler.start()

try:
    while True:
        time.sleep(2)
        print("Main Thread is running")
except (KeyboardInterrupt, SystemExit):
  scheduler.shutdown()