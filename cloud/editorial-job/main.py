"""Point d'entrée du conteneur Cloud Run (MODE=publish). La veille tourne dans une routine Claude Code, voir README."""
import os
import sys

if os.environ.get("MODE", "publish") != "publish":
    sys.exit(f"MODE inconnu : {os.environ['MODE']!r} (seul « publish » existe)")

from publish import main

raise SystemExit(main())
