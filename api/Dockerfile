FROM python:3.12-slim

# Security hardening
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev gcc curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/* && \
    # Create non-root user
    addgroup --system nexara && adduser --system --group nexara

WORKDIR /app

# Install dependencies first (cached layer)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Switch to non-root user
USER nexara

# Cloud Run listens on PORT env var (default 8080)
ENV PORT=8080
EXPOSE 8080

# Gunicorn: production-grade WSGI server
CMD exec gunicorn \
    --bind "0.0.0.0:$PORT" \
    --workers 2 \
    --threads 4 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile - \
    nexara.wsgi:application
