"""Point d'entrée du conteneur : MODE=publish ou MODE=veille (variable d'environnement du job Cloud Run)."""
import os
import sys

mode = os.environ.get("MODE", "")
if mode == "publish":
    from publish import main
elif mode == "veille":
    from veille import main
else:
    sys.exit(f"MODE inconnu : {mode!r} (attendu : publish ou veille)")

raise SystemExit(main())
