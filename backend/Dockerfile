# Use an official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.11.0-slim

# Set environment variables. PYTHONUNBUFFERED ensures our console output looks familiar and is not buffered by Docker,
# which is useful for debugging.
ENV PYTHONUNBUFFERED True

# Create and set the working directory inside the container
WORKDIR /app

# Copy local code to the container
COPY . .

# Install production dependencies.
RUN pip install --no-cache-dir -r requirements.txt

# Service must listen to $PORT environment variable.
# This default value facilitates local development.
ENV PORT 8090
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 server_side:app
