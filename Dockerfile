FROM python:3.12.2

COPY ./pythonProject /pythonProject
WORKDIR /pythonProject

RUN pip install -r ./requirements.txt

EXPOSE 8082

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8082"]