# Servidor compatível com AgentCore, em modo simulação por padrão. Não tem autenticação:
# publique só em localhost (docker run -p 127.0.0.1:8080:8080). Bedrock exige opt-in.
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY core.py agent.py app.py cli.py ./
RUN useradd --create-home lab
USER lab
ENV TRIAGE_BIND=0.0.0.0 TRIAGE_MODE=offline TRIAGE_ENABLE_BEDROCK=0
EXPOSE 8080
CMD ["python", "app.py"]
