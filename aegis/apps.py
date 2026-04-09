from django.apps import AppConfig


class AegisConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "aegis"
    verbose_name = "Aegis Cybersecurity"

    def ready(self):
        # Register scheduled jobs when app is ready
        try:
            from aegis import tasks  # noqa: F401 — triggers scheduler registration
        except Exception:
            pass
