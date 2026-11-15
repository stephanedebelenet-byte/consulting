# Job éditorial nextinotech.com (Cloud Run Jobs) : publication planifiée (aucun appel à Claude).
# Node 24 pour le site (build Vite, scripts .mjs/.ts), Python pour l'orchestration.
FROM node:24-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends git ca-certificates python3 python3-venv \
 && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH" PYTHONUNBUFFERED=1 TZ=Africa/Casablanca

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY *.py sources.json ./

CMD ["python", "main.py"]
