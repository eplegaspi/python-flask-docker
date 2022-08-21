FROM python:3.7

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt

# ENTRYPOINT ["python"]

# CMD ["app/app.py"]

CMD gunicorn --bind 0.0.0.0:5000 wsgi:app