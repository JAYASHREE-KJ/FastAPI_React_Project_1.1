import time

def save_log(message: str):
    time.sleep(5)
    with open("log.txt", "a") as f:
        f.write(message + "\n")
