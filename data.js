const COMMANDS = [
  // ── UNIVERSEL ─────────────────────────────────────────────
  {
    name: "cd",
    os: "universal",
    category: "Navigation",
    description: "Change le répertoire de travail courant.",
    syntax: "cd <chemin>",
    examples: [
      { cmd: "cd /etc", desc: "Aller dans /etc" },
      { cmd: "cd ..", desc: "Remonter d'un niveau" },
      { cmd: "cd ~", desc: "Aller dans le home" }
    ],
    flags: ["~ (home)", "- (répertoire précédent)", ".. (parent)"]
  },
  {
    name: "ls",
    os: "universal",
    category: "Navigation",
    description: "Liste le contenu d'un répertoire.",
    syntax: "ls [options] [chemin]",
    examples: [
      { cmd: "ls -la", desc: "Liste détaillée avec fichiers cachés" },
      { cmd: "ls -lh /var/log", desc: "Taille lisible par humain" }
    ],
    flags: ["-l (format long)", "-a (fichiers cachés)", "-h (taille lisible)", "-R (récursif)"]
  },
  {
    name: "pwd",
    os: "universal",
    category: "Navigation",
    description: "Affiche le chemin absolu du répertoire courant.",
    syntax: "pwd",
    examples: [
      { cmd: "pwd", desc: "Affiche ex: /home/tom/projets" }
    ],
    flags: []
  },
  {
    name: "grep",
    os: "universal",
    category: "Fichiers",
    description: "Recherche un motif dans des fichiers ou la sortie d'une commande.",
    syntax: "grep [options] <motif> [fichier]",
    examples: [
      { cmd: "grep -r 'error' /var/log/", desc: "Cherche 'error' récursivement" },
      { cmd: "grep -i 'root' /etc/passwd", desc: "Insensible à la casse" },
      { cmd: "dmesg | grep -i 'usb'", desc: "Filtre la sortie de dmesg" }
    ],
    flags: ["-r (récursif)", "-i (insensible casse)", "-n (numéro ligne)", "-v (inverse)"]
  },
  {
    name: "cat",
    os: "universal",
    category: "Fichiers",
    description: "Affiche le contenu d'un fichier ou concatène plusieurs fichiers.",
    syntax: "cat [fichier...]",
    examples: [
      { cmd: "cat /etc/hosts", desc: "Affiche le fichier hosts" },
      { cmd: "cat file1 file2 > merged.txt", desc: "Concatène deux fichiers" }
    ],
    flags: ["-n (numéroter lignes)", "-A (afficher caractères spéciaux)"]
  },
  {
    name: "echo",
    os: "universal",
    category: "Système",
    description: "Affiche du texte ou la valeur d'une variable dans le terminal.",
    syntax: "echo [texte ou variable]",
    examples: [
      { cmd: "echo $PATH", desc: "Affiche la variable PATH" },
      { cmd: "echo 'Hello' > file.txt", desc: "Écrit dans un fichier" }
    ],
    flags: ["-n (sans saut de ligne)", "-e (interpréter \\n, \\t...)"]
  },
  {
    name: "man",
    os: "universal",
    category: "Système",
    description: "Affiche le manuel d'une commande.",
    syntax: "man <commande>",
    examples: [
      { cmd: "man ls", desc: "Manuel de ls" },
      { cmd: "man 5 passwd", desc: "Section 5 : formats de fichiers" }
    ],
    flags: ["-k (chercher par mot-clé)"]
  },
  {
    name: "history",
    os: "universal",
    category: "Système",
    description: "Affiche l'historique des commandes exécutées dans le shell.",
    syntax: "history [n]",
    examples: [
      { cmd: "history", desc: "Toutes les commandes récentes" },
      { cmd: "history | grep ssh", desc: "Chercher dans l'historique" }
    ],
    flags: ["-c (vider l'historique)"]
  },
  {
    name: "cp",
    os: "universal",
    category: "Fichiers",
    description: "Copie un ou plusieurs fichiers/dossiers.",
    syntax: "cp [options] <source> <destination>",
    examples: [
      { cmd: "cp fichier.txt /tmp/", desc: "Copie un fichier" },
      { cmd: "cp -r dossier/ /backup/", desc: "Copie récursive d'un dossier" }
    ],
    flags: ["-r (récursif)", "-v (verbose)", "-i (confirmer écrasement)"]
  },
  {
    name: "mv",
    os: "universal",
    category: "Fichiers",
    description: "Déplace ou renomme un fichier ou un dossier.",
    syntax: "mv <source> <destination>",
    examples: [
      { cmd: "mv ancien.txt nouveau.txt", desc: "Renomme un fichier" },
      { cmd: "mv fichier.txt /home/user/", desc: "Déplace un fichier" }
    ],
    flags: ["-i (confirmer)", "-v (verbose)", "-n (no clobber)"]
  },
  {
    name: "rm",
    os: "universal",
    category: "Fichiers",
    description: "Supprime des fichiers ou dossiers (irréversible).",
    syntax: "rm [options] <fichier>",
    examples: [
      { cmd: "rm fichier.txt", desc: "Supprime un fichier" },
      { cmd: "rm -rf dossier/", desc: "Supprime un dossier et son contenu (attention !)" }
    ],
    flags: ["-r (récursif)", "-f (forcer)", "-i (confirmer)"]
  },
  {
    name: "mkdir",
    os: "universal",
    category: "Fichiers",
    description: "Crée un nouveau dossier.",
    syntax: "mkdir [options] <dossier>",
    examples: [
      { cmd: "mkdir projet", desc: "Crée un dossier" },
      { cmd: "mkdir -p a/b/c", desc: "Crée toute l'arborescence en une fois" }
    ],
    flags: ["-p (créer les parents)", "-v (verbose)"]
  },
  {
    name: "find",
    os: "universal",
    category: "Fichiers",
    description: "Recherche des fichiers/dossiers selon des critères (nom, taille, date...).",
    syntax: "find <chemin> [critères]",
    examples: [
      { cmd: "find / -name \"*.log\"", desc: "Cherche tous les fichiers .log" },
      { cmd: "find . -mtime -1", desc: "Fichiers modifiés dans les dernières 24h" },
      { cmd: "find . -size +100M", desc: "Fichiers de plus de 100 Mo" }
    ],
    flags: ["-name", "-type f|d", "-mtime", "-size", "-exec"]
  },
  {
    name: "ps",
    os: "universal",
    category: "Processus",
    description: "Affiche les processus en cours d'exécution.",
    syntax: "ps [options]",
    examples: [
      { cmd: "ps aux", desc: "Tous les processus avec détails" },
      { cmd: "ps aux | grep nginx", desc: "Filtre les processus nginx" }
    ],
    flags: ["aux (tous + détails)", "-ef (format standard)"]
  },
  {
    name: "kill",
    os: "universal",
    category: "Processus",
    description: "Envoie un signal à un processus (par défaut SIGTERM pour l'arrêter).",
    syntax: "kill [signal] <PID>",
    examples: [
      { cmd: "kill 1234", desc: "Demande l'arrêt propre du processus" },
      { cmd: "kill -9 1234", desc: "Force l'arrêt immédiat (SIGKILL)" }
    ],
    flags: ["-9 (SIGKILL)", "-15 (SIGTERM, défaut)", "-l (lister les signaux)"]
  },
  {
    name: "top",
    os: "universal",
    category: "Processus",
    description: "Affiche en temps réel les processus et la charge système (CPU, RAM).",
    syntax: "top",
    examples: [
      { cmd: "top", desc: "Vue temps réel des processus" },
      { cmd: "top -u www-data", desc: "Filtre par utilisateur" }
    ],
    flags: ["-u (utilisateur)", "M (trier par mémoire)", "P (trier par CPU)"]
  },
  {
    name: "df",
    os: "universal",
    category: "Système",
    description: "Affiche l'espace disque utilisé et disponible par système de fichiers.",
    syntax: "df [options]",
    examples: [
      { cmd: "df -h", desc: "Espace disque en format lisible (Go/Mo)" },
      { cmd: "df -h /var", desc: "Espace disque pour une partition précise" }
    ],
    flags: ["-h (human-readable)", "-T (type de FS)"]
  },
  {
    name: "du",
    os: "universal",
    category: "Système",
    description: "Affiche la taille occupée par des fichiers ou dossiers.",
    syntax: "du [options] <chemin>",
    examples: [
      { cmd: "du -sh /var/log", desc: "Taille totale d'un dossier, format lisible" },
      { cmd: "du -h --max-depth=1 /home", desc: "Taille de chaque sous-dossier" }
    ],
    flags: ["-s (résumé)", "-h (human-readable)", "--max-depth"]
  },
  {
    name: "chmod",
    os: "universal",
    category: "Permissions",
    description: "Modifie les permissions (lecture/écriture/exécution) d'un fichier ou dossier.",
    syntax: "chmod <mode> <fichier>",
    examples: [
      { cmd: "chmod 755 script.sh", desc: "rwx pour le proprio, rx pour les autres" },
      { cmd: "chmod +x script.sh", desc: "Ajoute le droit d'exécution" },
      { cmd: "chmod -R 644 dossier/", desc: "Applique récursivement" }
    ],
    flags: ["-R (récursif)", "+x / -x", "u/g/o (user/group/other)"]
  },
  {
    name: "ssh",
    os: "universal",
    category: "Réseau",
    description: "Ouvre une connexion shell sécurisée vers une machine distante.",
    syntax: "ssh [utilisateur@]<hôte> [-p <port>]",
    examples: [
      { cmd: "ssh user@192.168.1.10", desc: "Connexion SSH simple" },
      { cmd: "ssh -i clé.pem user@serveur.com", desc: "Connexion avec une clé privée" },
      { cmd: "ssh -p 2222 user@serveur.com", desc: "Connexion sur un port personnalisé" }
    ],
    flags: ["-p (port)", "-i (clé privée)", "-v (verbose/debug)"]
  },

  // ── DEBIAN / UBUNTU ───────────────────────────────────────
  {
    name: "apt update",
    os: "debian",
    category: "Paquets",
    description: "Met à jour la liste des paquets disponibles depuis les dépôts.",
    syntax: "sudo apt update",
    examples: [
      { cmd: "sudo apt update", desc: "Mise à jour simple de l'index" },
      { cmd: "sudo apt update && sudo apt upgrade -y", desc: "Update + upgrade en chaîne" }
    ],
    flags: []
  },
  {
    name: "apt install",
    os: "debian",
    category: "Paquets",
    description: "Installe un ou plusieurs paquets depuis les dépôts APT.",
    syntax: "sudo apt install <paquet>",
    examples: [
      { cmd: "sudo apt install curl", desc: "Installe curl" },
      { cmd: "sudo apt install -y nginx", desc: "Sans confirmation" }
    ],
    flags: ["-y (auto-confirmer)", "--no-install-recommends", "--reinstall"]
  },
  {
    name: "apt remove",
    os: "debian",
    category: "Paquets",
    description: "Supprime un paquet installé (conserve les fichiers de config).",
    syntax: "sudo apt remove <paquet>",
    examples: [
      { cmd: "sudo apt remove nginx", desc: "Supprime nginx" },
      { cmd: "sudo apt purge nginx", desc: "Supprime nginx + ses configs" }
    ],
    flags: ["purge (supprime aussi la config)", "autoremove (nettoyage)"]
  },
  {
    name: "dpkg -l",
    os: "debian",
    category: "Paquets",
    description: "Liste les paquets installés sur le système.",
    syntax: "dpkg -l [motif]",
    examples: [
      { cmd: "dpkg -l", desc: "Tous les paquets installés" },
      { cmd: "dpkg -i paquet.deb", desc: "Installe un .deb local" }
    ],
    flags: ["-l (lister)", "-i (installer .deb)", "-r (supprimer)"]
  },
  {
    name: "systemctl",
    os: "debian",
    category: "Services",
    description: "Gère les services systemd (démarrage, arrêt, statut, activation).",
    syntax: "systemctl <action> <service>",
    examples: [
      { cmd: "systemctl status nginx", desc: "Statut du service nginx" },
      { cmd: "systemctl enable --now ssh", desc: "Active et démarre ssh" }
    ],
    flags: ["start / stop / restart / reload / status / enable / disable"]
  },
  {
    name: "ufw",
    os: "debian",
    category: "Réseau",
    description: "Firewall simplifié pour gérer les règles iptables.",
    syntax: "sudo ufw <commande>",
    examples: [
      { cmd: "sudo ufw enable", desc: "Active le pare-feu" },
      { cmd: "sudo ufw allow 22/tcp", desc: "Autorise SSH" }
    ],
    flags: ["allow / deny / delete / status / reset"]
  },
  {
    name: "journalctl",
    os: "debian",
    category: "Système",
    description: "Consulte les logs systemd (journal).",
    syntax: "journalctl [options]",
    examples: [
      { cmd: "journalctl -u nginx", desc: "Logs du service nginx" },
      { cmd: "journalctl -f", desc: "Suivre les logs en temps réel" }
    ],
    flags: ["-u (unité)", "-f (follow)", "-n (n dernières lignes)"]
  },
  {
    name: "chown",
    os: "debian",
    category: "Permissions",
    description: "Change le propriétaire et/ou le groupe d'un fichier.",
    syntax: "chown [user][:group] <fichier>",
    examples: [
      { cmd: "chown tom:tom fichier.txt", desc: "Propriétaire = tom" },
      { cmd: "chown -R www-data /var/www/", desc: "Récursif pour Nginx" }
    ],
    flags: ["-R (récursif)"]
  },
  {
    name: "ss",
    os: "debian",
    category: "Réseau",
    description: "Affiche les connexions réseau et ports en écoute.",
    syntax: "ss [options]",
    examples: [
      { cmd: "ss -tulnp", desc: "Ports TCP/UDP en écoute avec processus" },
      { cmd: "ss -s", desc: "Résumé des statistiques réseau" }
    ],
    flags: ["-t (TCP)", "-u (UDP)", "-l (listening)", "-n (numérique)", "-p (processus)"]
  },
  {
    name: "tar",
    os: "debian",
    category: "Archives",
    description: "Crée, extrait ou liste des archives .tar, .tar.gz.",
    syntax: "tar [options] <archive> [fichiers]",
    examples: [
      { cmd: "tar -czf archive.tar.gz /etc/", desc: "Compresse /etc en .tar.gz" },
      { cmd: "tar -xzf archive.tar.gz", desc: "Extrait une archive .tar.gz" }
    ],
    flags: ["-c (créer)", "-x (extraire)", "-z (gzip)", "-f (fichier)", "-v (verbose)"]
  },
  {
    name: "apt list --upgradable",
    os: "debian",
    category: "Paquets",
    description: "Liste les paquets pour lesquels une mise à jour est disponible.",
    syntax: "apt list --upgradable",
    examples: [
      { cmd: "apt list --upgradable", desc: "Paquets à mettre à jour" },
      { cmd: "apt list --installed | grep nginx", desc: "Vérifie si nginx est installé" }
    ],
    flags: ["--upgradable", "--installed", "--all-versions"]
  },
  {
    name: "ip a",
    os: "debian",
    category: "Réseau",
    description: "Affiche les interfaces réseau et leurs adresses IP (remplace ifconfig).",
    syntax: "ip a [show <interface>]",
    examples: [
      { cmd: "ip a", desc: "Toutes les interfaces et leurs IP" },
      { cmd: "ip a show eth0", desc: "Détails d'une interface précise" },
      { cmd: "ip route", desc: "Affiche la table de routage" }
    ],
    flags: ["a / addr (adresses)", "link (état des interfaces)", "route (table de routage)"]
  },
  {
    name: "apt-get autoremove",
    os: "debian",
    category: "Paquets",
    description: "Supprime les paquets installés automatiquement comme dépendances et plus utilisés.",
    syntax: "sudo apt autoremove [--purge]",
    examples: [
      { cmd: "sudo apt autoremove", desc: "Nettoie les dépendances orphelines" },
      { cmd: "sudo apt autoremove --purge", desc: "Supprime aussi les fichiers de config" }
    ],
    flags: ["--purge", "-y"]
  },
  {
    name: "add-apt-repository",
    os: "debian",
    category: "Paquets",
    description: "Ajoute un dépôt tiers (PPA) à la liste des sources APT.",
    syntax: "sudo add-apt-repository <ppa:...>",
    examples: [
      { cmd: "sudo add-apt-repository ppa:deadsnakes/ppa", desc: "Ajoute un PPA Python" },
      { cmd: "sudo add-apt-repository --remove ppa:deadsnakes/ppa", desc: "Retire un PPA" }
    ],
    flags: ["--remove", "-y"]
  },
  {
    name: "useradd / passwd",
    os: "debian",
    category: "Utilisateurs",
    description: "Crée un utilisateur système et définit son mot de passe.",
    syntax: "sudo useradd -m <user> ; sudo passwd <user>",
    examples: [
      { cmd: "sudo useradd -m -s /bin/bash tom", desc: "Crée un utilisateur avec home et bash" },
      { cmd: "sudo passwd tom", desc: "Définit le mot de passe de l'utilisateur" }
    ],
    flags: ["-m (créer le home)", "-s (shell)", "-G (groupes secondaires)"]
  },
  {
    name: "usermod -aG",
    os: "debian",
    category: "Utilisateurs",
    description: "Ajoute un utilisateur à un groupe secondaire (ex: sudo, docker).",
    syntax: "sudo usermod -aG <groupe> <user>",
    examples: [
      { cmd: "sudo usermod -aG sudo tom", desc: "Donne les droits sudo à tom" },
      { cmd: "sudo usermod -aG docker tom", desc: "Permet d'utiliser Docker sans sudo" }
    ],
    flags: ["-aG (append + group)", "-G (remplace les groupes)"]
  },
  {
    name: "netplan apply",
    os: "debian",
    category: "Réseau",
    description: "Applique la configuration réseau définie dans les fichiers YAML Netplan.",
    syntax: "sudo netplan apply",
    examples: [
      { cmd: "sudo netplan apply", desc: "Applique la config réseau actuelle" },
      { cmd: "sudo netplan try", desc: "Teste la config avec rollback automatique" }
    ],
    flags: ["try (avec rollback)", "--debug"]
  },
  {
    name: "crontab -e",
    os: "debian",
    category: "Système",
    description: "Édite les tâches planifiées (cron) de l'utilisateur courant.",
    syntax: "crontab -e",
    examples: [
      { cmd: "crontab -e", desc: "Édite le crontab" },
      { cmd: "crontab -l", desc: "Liste les tâches planifiées" },
      { cmd: "0 2 * * * /scripts/backup.sh", desc: "Exemple : exécute un script tous les jours à 2h" }
    ],
    flags: ["-e (éditer)", "-l (lister)", "-r (supprimer)"]
  },
  {
    name: "fail2ban-client",
    os: "debian",
    category: "Permissions",
    description: "Gère Fail2ban, qui bannit automatiquement les IP après des tentatives de connexion échouées.",
    syntax: "sudo fail2ban-client <commande>",
    examples: [
      { cmd: "sudo fail2ban-client status sshd", desc: "État du jail SSH (IP bannies)" },
      { cmd: "sudo fail2ban-client unban 1.2.3.4", desc: "Débanni une IP" }
    ],
    flags: ["status", "unban", "reload"]
  },
  {
    name: "lsblk",
    os: "debian",
    category: "Système",
    description: "Liste les périphériques de stockage et leurs partitions.",
    syntax: "lsblk [options]",
    examples: [
      { cmd: "lsblk", desc: "Liste les disques et partitions" },
      { cmd: "lsblk -f", desc: "Affiche aussi le système de fichiers et l'UUID" }
    ],
    flags: ["-f (filesystem)", "-a (tous, y compris vides)"]
  },
  {
    name: "docker (sur Debian)",
    os: "debian",
    category: "Conteneurs",
    description: "Installation et démarrage rapide du moteur Docker sur Debian/Ubuntu.",
    syntax: "curl -fsSL https://get.docker.com | sh",
    examples: [
      { cmd: "curl -fsSL https://get.docker.com | sh", desc: "Installe Docker via le script officiel" },
      { cmd: "sudo systemctl enable --now docker", desc: "Active et démarre le service Docker" }
    ],
    flags: []
  },

  // ── ALPINE LINUX ──────────────────────────────────────────
  {
    name: "apk update",
    os: "alpine",
    category: "Paquets",
    description: "Met à jour l'index des paquets disponibles sur Alpine Linux.",
    syntax: "apk update",
    examples: [
      { cmd: "apk update", desc: "Mise à jour de l'index" },
      { cmd: "apk update && apk upgrade", desc: "Update + upgrade" }
    ],
    flags: []
  },
  {
    name: "apk add",
    os: "alpine",
    category: "Paquets",
    description: "Installe un ou plusieurs paquets sur Alpine Linux.",
    syntax: "apk add <paquet>",
    examples: [
      { cmd: "apk add curl", desc: "Installe curl" },
      { cmd: "apk add --no-cache nginx", desc: "Sans cache (idéal Docker)" }
    ],
    flags: ["--no-cache (pas de cache)", "--virtual (groupe virtuel)"]
  },
  {
    name: "apk del",
    os: "alpine",
    category: "Paquets",
    description: "Supprime un paquet installé sur Alpine Linux.",
    syntax: "apk del <paquet>",
    examples: [
      { cmd: "apk del curl", desc: "Supprime curl" },
      { cmd: "apk del --purge nginx", desc: "Supprime + fichiers config" }
    ],
    flags: ["--purge (supprimer config)"]
  },
  {
    name: "apk info",
    os: "alpine",
    category: "Paquets",
    description: "Affiche les informations sur un paquet installé ou disponible.",
    syntax: "apk info [paquet]",
    examples: [
      { cmd: "apk info", desc: "Liste tous les paquets installés" },
      { cmd: "apk info nginx", desc: "Détails sur nginx" }
    ],
    flags: ["-L (fichiers)", "-e (vérifie si installé)"]
  },
  {
    name: "apk search",
    os: "alpine",
    category: "Paquets",
    description: "Recherche un paquet dans les dépôts Alpine.",
    syntax: "apk search <motif>",
    examples: [
      { cmd: "apk search curl", desc: "Cherche les paquets contenant 'curl'" }
    ],
    flags: ["-v (verbeux)", "-e (exact)"]
  },
  {
    name: "rc-service",
    os: "alpine",
    category: "Services",
    description: "Gère les services OpenRC sur Alpine Linux.",
    syntax: "rc-service <service> <action>",
    examples: [
      { cmd: "rc-service nginx start", desc: "Démarre nginx" },
      { cmd: "rc-service sshd status", desc: "Statut de sshd" }
    ],
    flags: ["start / stop / restart / status"]
  },
  {
    name: "rc-update",
    os: "alpine",
    category: "Services",
    description: "Active ou désactive un service au démarrage (OpenRC).",
    syntax: "rc-update <add|del> <service>",
    examples: [
      { cmd: "rc-update add nginx default", desc: "Active nginx au boot" },
      { cmd: "rc-update show", desc: "Liste les services par runlevel" }
    ],
    flags: ["default / boot / sysinit (runlevels)"]
  },
  {
    name: "adduser",
    os: "alpine",
    category: "Utilisateurs",
    description: "Crée un utilisateur sur Alpine Linux (syntaxe BusyBox).",
    syntax: "adduser [options] <utilisateur>",
    examples: [
      { cmd: "adduser tom", desc: "Crée l'utilisateur tom" },
      { cmd: "adduser -D -H -s /sbin/nologin appuser", desc: "Utilisateur service sans home" }
    ],
    flags: ["-D (pas de mot de passe)", "-H (pas de home)", "-s (shell)"]
  },
  {
    name: "lbu commit",
    os: "alpine",
    category: "Système",
    description: "Sauvegarde la configuration Alpine en mode diskless.",
    syntax: "lbu commit [-d]",
    examples: [
      { cmd: "lbu commit", desc: "Sauvegarde la config sur le média de boot" },
      { cmd: "lbu diff", desc: "Fichiers modifiés depuis le dernier commit" }
    ],
    flags: ["-d (supprime ancienne sauvegarde)"]
  },
  {
    name: "setup-alpine",
    os: "alpine",
    category: "Système",
    description: "Script d'initialisation interactif d'une installation Alpine.",
    syntax: "setup-alpine",
    examples: [
      { cmd: "setup-alpine", desc: "Lance l'assistant d'installation" },
      { cmd: "setup-hostname mon-serveur", desc: "Définit le hostname" }
    ],
    flags: []
  },
  {
    name: "apk upgrade",
    os: "alpine",
    category: "Paquets",
    description: "Met à jour tous les paquets installés vers leur dernière version disponible.",
    syntax: "apk upgrade [--available]",
    examples: [
      { cmd: "apk upgrade", desc: "Met à jour tous les paquets installés" },
      { cmd: "apk upgrade --available", desc: "Réinstalle depuis les dépôts si version dispo" }
    ],
    flags: ["--available", "-U (update avant upgrade)", "--no-cache"]
  },
  {
    name: "apk fix",
    os: "alpine",
    category: "Paquets",
    description: "Répare les paquets endommagés ou les dépendances cassées.",
    syntax: "apk fix [paquet]",
    examples: [
      { cmd: "apk fix", desc: "Répare tous les paquets" },
      { cmd: "apk fix --reinstall nginx", desc: "Réinstalle un paquet précis" }
    ],
    flags: ["--reinstall", "--depends"]
  },
  {
    name: "doas",
    os: "alpine",
    category: "Permissions",
    description: "Exécute une commande en tant que superutilisateur (équivalent léger de sudo sur Alpine).",
    syntax: "doas <commande>",
    examples: [
      { cmd: "doas apk add nginx", desc: "Installe un paquet avec élévation de privilèges" },
      { cmd: "doas -u www-data ls /var/www", desc: "Exécute en tant qu'un autre utilisateur" }
    ],
    flags: ["-u (utilisateur cible)"]
  },
  {
    name: "addgroup",
    os: "alpine",
    category: "Utilisateurs",
    description: "Crée un nouveau groupe système et y ajoute éventuellement des utilisateurs.",
    syntax: "addgroup [-S] <nom>",
    examples: [
      { cmd: "addgroup admins", desc: "Crée un groupe" },
      { cmd: "addgroup tom admins", desc: "Ajoute tom au groupe admins" }
    ],
    flags: ["-S (groupe système)"]
  },
  {
    name: "deluser / delgroup",
    os: "alpine",
    category: "Utilisateurs",
    description: "Supprime un utilisateur ou un groupe du système.",
    syntax: "deluser <user> | delgroup <groupe>",
    examples: [
      { cmd: "deluser tom", desc: "Supprime l'utilisateur tom" },
      { cmd: "deluser tom admins", desc: "Retire tom du groupe admins seulement" }
    ],
    flags: ["--remove-home"]
  },
  {
    name: "ifconfig (Alpine)",
    os: "alpine",
    category: "Réseau",
    description: "Configure ou affiche les interfaces réseau (BusyBox ifconfig sur Alpine).",
    syntax: "ifconfig <interface> [options]",
    examples: [
      { cmd: "ifconfig", desc: "Liste les interfaces et leurs IP" },
      { cmd: "ifconfig eth0 192.168.1.50 netmask 255.255.255.0", desc: "Configure une IP statique" }
    ],
    flags: []
  },
  {
    name: "setup-interfaces",
    os: "alpine",
    category: "Réseau",
    description: "Assistant interactif pour configurer les interfaces réseau d'Alpine.",
    syntax: "setup-interfaces",
    examples: [
      { cmd: "setup-interfaces", desc: "Lance l'assistant réseau interactif" }
    ],
    flags: []
  },
  {
    name: "rc-status",
    os: "alpine",
    category: "Services",
    description: "Affiche l'état de tous les services gérés par OpenRC, classés par runlevel.",
    syntax: "rc-status [runlevel]",
    examples: [
      { cmd: "rc-status", desc: "État de tous les services du runlevel par défaut" },
      { cmd: "rc-status -a", desc: "Tous les runlevels" }
    ],
    flags: ["-a (tous les runlevels)"]
  },
  {
    name: "tar (BusyBox)",
    os: "alpine",
    category: "Archives",
    description: "Crée ou extrait des archives avec la version allégée BusyBox de tar.",
    syntax: "tar [options] <archive>",
    examples: [
      { cmd: "tar -czf backup.tar.gz /etc", desc: "Crée une archive compressée" },
      { cmd: "tar -xzf backup.tar.gz -C /restore", desc: "Extrait vers un dossier précis" }
    ],
    flags: ["-c", "-x", "-z", "-f", "-C (destination)"]
  },
  {
    name: "apk cache",
    os: "alpine",
    category: "Paquets",
    description: "Gère le cache local des paquets téléchargés (utile en mode lbu/diskless).",
    syntax: "apk cache <action>",
    examples: [
      { cmd: "apk cache download", desc: "Télécharge les paquets installés dans le cache" },
      { cmd: "apk cache clean", desc: "Nettoie le cache des paquets obsolètes" }
    ],
    flags: ["download", "clean", "sync"]
  },
  {
    name: "df -h (Alpine)",
    os: "alpine",
    category: "Système",
    description: "Affiche l'espace disque, particulièrement utile en mode diskless pour surveiller le tmpfs.",
    syntax: "df -h",
    examples: [
      { cmd: "df -h", desc: "Espace disque lisible, y compris le tmpfs en RAM" }
    ],
    flags: ["-h"]
  },
  {
    name: "openrc",
    os: "alpine",
    category: "Système",
    description: "Déclenche manuellement un runlevel OpenRC complet (démarrage des services associés).",
    syntax: "openrc <runlevel>",
    examples: [
      { cmd: "openrc default", desc: "Démarre tous les services du runlevel default" },
      { cmd: "openrc boot", desc: "Exécute les services du runlevel boot" }
    ],
    flags: []
  },

  // ── ARCH LINUX ────────────────────────────────────────────
  {
    name: "pacman -Syu",
    os: "arch",
    category: "Paquets",
    description: "Met à jour l'ensemble du système Arch Linux.",
    syntax: "sudo pacman -Syu",
    examples: [
      { cmd: "sudo pacman -Syu", desc: "Mise à jour complète du système" }
    ],
    flags: ["-S (sync)", "-y (refresh)", "-u (upgrade)"]
  },
  {
    name: "pacman -S",
    os: "arch",
    category: "Paquets",
    description: "Installe un paquet depuis les dépôts officiels Arch.",
    syntax: "sudo pacman -S <paquet>",
    examples: [
      { cmd: "sudo pacman -S git", desc: "Installe git" },
      { cmd: "sudo pacman -S --noconfirm vim", desc: "Sans confirmation" }
    ],
    flags: ["--noconfirm", "--needed (ne réinstalle pas)"]
  },
  {
    name: "pacman -R",
    os: "arch",
    category: "Paquets",
    description: "Supprime un paquet et ses dépendances orphelines.",
    syntax: "sudo pacman -R <paquet>",
    examples: [
      { cmd: "sudo pacman -Rs vim", desc: "Supprime vim + dépendances orphelines" }
    ],
    flags: ["-R (remove)", "-s (dépendances)", "-n (config)"]
  },
  {
    name: "pacman -Q",
    os: "arch",
    category: "Paquets",
    description: "Interroge la base de données locale des paquets installés.",
    syntax: "pacman -Q [options] [paquet]",
    examples: [
      { cmd: "pacman -Q", desc: "Liste tous les paquets installés" },
      { cmd: "pacman -Qi vim", desc: "Informations détaillées sur vim" }
    ],
    flags: ["-s (search)", "-i (info)", "-l (list files)"]
  },
  {
    name: "pacman -Ss",
    os: "arch",
    category: "Paquets",
    description: "Recherche un paquet dans les dépôts Arch.",
    syntax: "pacman -Ss <motif>",
    examples: [
      { cmd: "pacman -Ss nginx", desc: "Cherche nginx dans les dépôts" }
    ],
    flags: []
  },
  {
    name: "yay -S",
    os: "arch",
    category: "Paquets",
    description: "Installe un paquet depuis l'AUR via yay.",
    syntax: "yay -S <paquet-aur>",
    examples: [
      { cmd: "yay -S google-chrome", desc: "Installe Chrome depuis l'AUR" },
      { cmd: "yay -Syu", desc: "Met à jour paquets officiels + AUR" }
    ],
    flags: ["--noconfirm", "--devel"]
  },
  {
    name: "makepkg",
    os: "arch",
    category: "Paquets",
    description: "Compile et installe un paquet depuis un PKGBUILD.",
    syntax: "makepkg [options]",
    examples: [
      { cmd: "makepkg -si", desc: "Compile + installe avec les dépendances" }
    ],
    flags: ["-s (synchdeps)", "-i (install)", "-c (clean)"]
  },
  {
    name: "reflector",
    os: "arch",
    category: "Système",
    description: "Met à jour et optimise la liste des miroirs Arch Linux.",
    syntax: "reflector [options]",
    examples: [
      { cmd: "reflector --country France --sort rate --save /etc/pacman.d/mirrorlist", desc: "Miroirs France triés par vitesse" }
    ],
    flags: ["--country", "--sort (rate/age)", "--save"]
  },
  {
    name: "paccache",
    os: "arch",
    category: "Système",
    description: "Nettoie le cache de paquets pacman.",
    syntax: "paccache [options]",
    examples: [
      { cmd: "paccache -r", desc: "Garde les 3 dernières versions" },
      { cmd: "paccache -rk1", desc: "Ne garde qu'une version par paquet" }
    ],
    flags: ["-r (remove)", "-k (keep N versions)"]
  },
  {
    name: "systemctl (Arch)",
    os: "arch",
    category: "Services",
    description: "Gère les services systemd sur Arch Linux.",
    syntax: "systemctl <action> <service>",
    examples: [
      { cmd: "systemctl enable --now NetworkManager", desc: "Active + démarre NetworkManager" },
      { cmd: "systemctl list-units --type=service", desc: "Liste tous les services" }
    ],
    flags: ["enable / disable / start / stop / restart / status"]
  },
  {
    name: "arch-chroot",
    os: "arch",
    category: "Système",
    description: "Entre dans une installation Arch montée pour la réparer (chroot avancé).",
    syntax: "arch-chroot <point_de_montage> [commande]",
    examples: [
      { cmd: "arch-chroot /mnt", desc: "Entre en chroot dans le système monté" },
      { cmd: "arch-chroot /mnt pacman -Syu", desc: "Exécute une commande sans rester en chroot" }
    ],
    flags: []
  },
  {
    name: "pacman -Sy yay",
    os: "arch",
    category: "Paquets",
    description: "Installe l'AUR helper yay, indispensable pour accéder aux paquets communautaires AUR.",
    syntax: "git clone https://aur.archlinux.org/yay.git && cd yay && makepkg -si",
    examples: [
      { cmd: "git clone https://aur.archlinux.org/yay.git", desc: "Clone le dépôt yay" },
      { cmd: "cd yay && makepkg -si", desc: "Compile et installe yay" }
    ],
    flags: []
  },
  {
    name: "pacman -Qdt",
    os: "arch",
    category: "Paquets",
    description: "Liste les paquets orphelins (dépendances inutilisées) pour les nettoyer.",
    syntax: "pacman -Qdt",
    examples: [
      { cmd: "pacman -Qdt", desc: "Liste les paquets orphelins" },
      { cmd: "sudo pacman -Rns $(pacman -Qdtq)", desc: "Supprime tous les orphelins en une commande" }
    ],
    flags: ["-Qdt (orphelins)", "-Rns (suppression complète)"]
  },
  {
    name: "useradd (Arch)",
    os: "arch",
    category: "Utilisateurs",
    description: "Crée un utilisateur sur Arch Linux et l'ajoute au groupe wheel pour sudo.",
    syntax: "useradd -m -G wheel -s /bin/bash <user>",
    examples: [
      { cmd: "useradd -m -G wheel -s /bin/bash tom", desc: "Crée un utilisateur avec accès sudo via wheel" },
      { cmd: "passwd tom", desc: "Définit son mot de passe" }
    ],
    flags: ["-m (home)", "-G wheel (groupe sudo)", "-s (shell)"]
  },
  {
    name: "ip / iwctl",
    os: "arch",
    category: "Réseau",
    description: "Configure le réseau filaire (ip) ou Wi-Fi (iwctl, via iwd) sur Arch.",
    syntax: "ip addr / iwctl",
    examples: [
      { cmd: "ip addr show", desc: "Affiche les interfaces réseau" },
      { cmd: "iwctl station wlan0 connect MonWifi", desc: "Connecte le Wi-Fi via iwd" }
    ],
    flags: []
  },
  {
    name: "ufw / iptables (Arch)",
    os: "arch",
    category: "Réseau",
    description: "Configure le pare-feu sur Arch Linux, via ufw (simplifié) ou iptables (manuel).",
    syntax: "sudo ufw enable | sudo iptables -A INPUT ...",
    examples: [
      { cmd: "sudo ufw allow 22/tcp", desc: "Autorise le port SSH" },
      { cmd: "sudo ufw enable", desc: "Active le pare-feu" }
    ],
    flags: ["allow", "deny", "enable", "status"]
  },
  {
    name: "journalctl (Arch)",
    os: "arch",
    category: "Système",
    description: "Consulte les journaux systemd, identique à Debian/RHEL car Arch utilise systemd.",
    syntax: "journalctl [options]",
    examples: [
      { cmd: "journalctl -b", desc: "Logs depuis le dernier démarrage" },
      { cmd: "journalctl -u sshd -f", desc: "Suit les logs du service sshd en direct" }
    ],
    flags: ["-b (boot)", "-u (unit)", "-f (suivre)", "-p err (erreurs seulement)"]
  },
  {
    name: "timeshift",
    os: "arch",
    category: "Système",
    description: "Crée des snapshots du système pour pouvoir revenir en arrière après une mise à jour cassée.",
    syntax: "sudo timeshift --create | --restore",
    examples: [
      { cmd: "sudo timeshift --create --comments \"avant maj\"", desc: "Crée un snapshot" },
      { cmd: "sudo timeshift --restore", desc: "Restaure un snapshot" }
    ],
    flags: ["--create", "--restore", "--list"]
  },
  {
    name: "pacman -U",
    os: "arch",
    category: "Paquets",
    description: "Installe un paquet local (.pkg.tar.zst) sans passer par les dépôts.",
    syntax: "sudo pacman -U <fichier.pkg.tar.zst>",
    examples: [
      { cmd: "sudo pacman -U paquet-1.0-1-x86_64.pkg.tar.zst", desc: "Installe un paquet local" }
    ],
    flags: ["-U (upgrade/install local)"]
  },
  {
    name: "btrfs subvolume",
    os: "arch",
    category: "Système",
    description: "Gère les sous-volumes Btrfs, souvent utilisés sur Arch pour faciliter les snapshots.",
    syntax: "btrfs subvolume <action> <chemin>",
    examples: [
      { cmd: "btrfs subvolume list /", desc: "Liste les sous-volumes" },
      { cmd: "btrfs subvolume snapshot / /.snapshots/avant-maj", desc: "Crée un snapshot du sous-volume racine" }
    ],
    flags: ["list", "create", "snapshot", "delete"]
  },
  {
    name: "mkinitcpio",
    os: "arch",
    category: "Système",
    description: "Régénère l'image initramfs, nécessaire après un changement de noyau ou de pilotes.",
    syntax: "sudo mkinitcpio -P",
    examples: [
      { cmd: "sudo mkinitcpio -P", desc: "Régénère toutes les images initramfs présentes" }
    ],
    flags: ["-P (toutes les présets)", "-g (générer vers un fichier précis)"]
  },

  // ── RHEL / FEDORA ─────────────────────────────────────────
  {
    name: "dnf install",
    os: "rhel",
    category: "Paquets",
    description: "Installe un paquet sur RHEL, CentOS, Fedora via DNF.",
    syntax: "sudo dnf install <paquet>",
    examples: [
      { cmd: "sudo dnf install nginx", desc: "Installe nginx" },
      { cmd: "sudo dnf install -y git curl", desc: "Sans confirmation" }
    ],
    flags: ["-y (auto-confirmer)", "--downloadonly", "--nodocs"]
  },
  {
    name: "dnf update",
    os: "rhel",
    category: "Paquets",
    description: "Met à jour les paquets installés sur le système.",
    syntax: "sudo dnf update",
    examples: [
      { cmd: "sudo dnf update", desc: "Met à jour tout le système" },
      { cmd: "sudo dnf check-update", desc: "Liste les mises à jour disponibles" }
    ],
    flags: ["--security (patchs sécu seulement)"]
  },
  {
    name: "dnf remove",
    os: "rhel",
    category: "Paquets",
    description: "Supprime un paquet et ses dépendances devenues inutiles.",
    syntax: "sudo dnf remove <paquet>",
    examples: [
      { cmd: "sudo dnf remove nginx", desc: "Supprime nginx" },
      { cmd: "sudo dnf autoremove", desc: "Supprime les dépendances orphelines" }
    ],
    flags: ["-y", "autoremove"]
  },
  {
    name: "rpm -qa",
    os: "rhel",
    category: "Paquets",
    description: "Liste tous les paquets RPM installés sur le système.",
    syntax: "rpm -qa [motif]",
    examples: [
      { cmd: "rpm -qa | grep nginx", desc: "Filtre sur nginx" },
      { cmd: "rpm -qi nginx", desc: "Informations détaillées" }
    ],
    flags: ["-q (query)", "-a (all)", "-i (info)", "-V (verify)"]
  },
  {
    name: "firewall-cmd",
    os: "rhel",
    category: "Réseau",
    description: "Gère le pare-feu firewalld sur RHEL/Fedora.",
    syntax: "firewall-cmd [options]",
    examples: [
      { cmd: "firewall-cmd --permanent --add-service=http", desc: "Ouvre le port HTTP" },
      { cmd: "firewall-cmd --reload", desc: "Recharge les règles" }
    ],
    flags: ["--permanent", "--add-service / --remove-service", "--reload"]
  },
  {
    name: "sestatus",
    os: "rhel",
    category: "Système",
    description: "Affiche l'état de SELinux.",
    syntax: "sestatus",
    examples: [
      { cmd: "sestatus", desc: "Statut complet de SELinux" },
      { cmd: "getenforce", desc: "Mode actuel : Enforcing / Permissive" },
      { cmd: "setenforce 0", desc: "Passe en mode Permissive" }
    ],
    flags: []
  },
  {
    name: "dnf search",
    os: "rhel",
    category: "Paquets",
    description: "Recherche un paquet dans les dépôts DNF.",
    syntax: "dnf search <motif>",
    examples: [
      { cmd: "dnf search nginx", desc: "Cherche nginx" },
      { cmd: "dnf provides /usr/bin/curl", desc: "Quel paquet fournit curl" }
    ],
    flags: []
  },
  {
    name: "systemctl (RHEL)",
    os: "rhel",
    category: "Services",
    description: "Gère les services systemd sur RHEL/Fedora.",
    syntax: "systemctl <action> <service>",
    examples: [
      { cmd: "systemctl enable --now httpd", desc: "Active et démarre Apache" },
      { cmd: "systemctl list-units --failed", desc: "Services en échec" }
    ],
    flags: ["enable / disable / start / stop / restart / status"]
  },
  {
    name: "subscription-manager",
    os: "rhel",
    category: "Système",
    description: "Gère les abonnements Red Hat Enterprise Linux.",
    syntax: "subscription-manager <commande>",
    examples: [
      { cmd: "subscription-manager register", desc: "Enregistre le système" },
      { cmd: "subscription-manager attach --auto", desc: "Attache un abonnement" }
    ],
    flags: ["register / unregister / list / attach"]
  },
  {
    name: "yum",
    os: "rhel",
    category: "Paquets",
    description: "Ancien gestionnaire de paquets RHEL/CentOS 7, remplacé par DNF.",
    syntax: "yum <action> <paquet>",
    examples: [
      { cmd: "yum install httpd", desc: "Installe Apache (CentOS 7)" },
      { cmd: "yum list installed", desc: "Liste les paquets installés" }
    ],
    flags: ["-y", "install / remove / update / search"]
  },
  {
    name: "semanage",
    os: "rhel",
    category: "Permissions",
    description: "Configure les politiques SELinux (ports, contextes de fichiers, booléens).",
    syntax: "semanage <module> <action> [options]",
    examples: [
      { cmd: "semanage port -a -t http_port_t -p tcp 8080", desc: "Autorise SELinux sur le port 8080 pour HTTP" },
      { cmd: "semanage fcontext -a -t httpd_sys_content_t \"/web(/.*)?\"", desc: "Définit un contexte SELinux pour un dossier" }
    ],
    flags: ["port", "fcontext", "boolean", "-a (add)", "-l (list)"]
  },
  {
    name: "useradd / usermod (RHEL)",
    os: "rhel",
    category: "Utilisateurs",
    description: "Crée et configure un utilisateur, l'ajoute au groupe wheel pour sudo.",
    syntax: "useradd -m -G wheel <user> ; passwd <user>",
    examples: [
      { cmd: "useradd -m -G wheel tom", desc: "Crée un utilisateur avec accès sudo" },
      { cmd: "passwd tom", desc: "Définit le mot de passe" }
    ],
    flags: ["-m (home)", "-G wheel", "-s (shell)"]
  },
  {
    name: "nmcli",
    os: "rhel",
    category: "Réseau",
    description: "Configure le réseau en ligne de commande via NetworkManager.",
    syntax: "nmcli <objet> <action> [options]",
    examples: [
      { cmd: "nmcli device status", desc: "État des interfaces réseau" },
      { cmd: "nmcli connection add type ethernet ifname eth0 ip4 192.168.1.10/24", desc: "Configure une IP statique" }
    ],
    flags: ["device", "connection", "general"]
  },
  {
    name: "journalctl (RHEL)",
    os: "rhel",
    category: "Système",
    description: "Consulte les journaux systemd centralisés du système.",
    syntax: "journalctl [options]",
    examples: [
      { cmd: "journalctl -xe", desc: "Erreurs récentes avec contexte détaillé" },
      { cmd: "journalctl -u httpd --since today", desc: "Logs du service httpd depuis aujourd'hui" }
    ],
    flags: ["-xe", "-u (unit)", "--since", "-f (suivre)"]
  },
  {
    name: "tar (RHEL)",
    os: "rhel",
    category: "Archives",
    description: "Crée ou extrait des archives, identique sur RHEL via GNU tar.",
    syntax: "tar [options] <archive>",
    examples: [
      { cmd: "tar -cvzf etc-backup.tar.gz /etc", desc: "Sauvegarde /etc en archive compressée" },
      { cmd: "tar -tvf archive.tar.gz", desc: "Liste le contenu sans extraire" }
    ],
    flags: ["-c", "-x", "-t (lister)", "-z (gzip)", "-v (verbose)"]
  },
  {
    name: "ansible (sur RHEL)",
    os: "rhel",
    category: "Conteneurs",
    description: "Installe et configure Ansible pour automatiser la gestion de plusieurs serveurs RHEL.",
    syntax: "sudo dnf install ansible-core",
    examples: [
      { cmd: "sudo dnf install ansible-core", desc: "Installe Ansible Core" },
      { cmd: "ansible all -m ping", desc: "Vérifie la connectivité avec l'inventaire" }
    ],
    flags: []
  },
  {
    name: "rpm -ivh / -Uvh",
    os: "rhel",
    category: "Paquets",
    description: "Installe ou met à jour un paquet RPM local directement, sans gestionnaire de dépendances.",
    syntax: "rpm -ivh <fichier.rpm> | rpm -Uvh <fichier.rpm>",
    examples: [
      { cmd: "rpm -ivh paquet.rpm", desc: "Installe un nouveau paquet RPM" },
      { cmd: "rpm -Uvh paquet.rpm", desc: "Met à jour un paquet déjà installé" }
    ],
    flags: ["-i (install)", "-U (upgrade)", "-v (verbose)", "-h (hash progress)"]
  },
  {
    name: "lvextend / xfs_growfs",
    os: "rhel",
    category: "Système",
    description: "Agrandit un volume logique LVM puis étend le système de fichiers XFS dessus.",
    syntax: "lvextend -L +<taille> <volume> ; xfs_growfs <point_de_montage>",
    examples: [
      { cmd: "lvextend -L +10G /dev/mapper/rhel-root", desc: "Agrandit le volume logique de 10 Go" },
      { cmd: "xfs_growfs /", desc: "Étend le système de fichiers XFS pour utiliser l'espace ajouté" }
    ],
    flags: ["-L (taille)", "-r (resize automatique avec lvresize)"]
  },
  {
    name: "timedatectl",
    os: "rhel",
    category: "Système",
    description: "Configure la date, l'heure et le fuseau horaire du système via systemd.",
    syntax: "timedatectl <action>",
    examples: [
      { cmd: "timedatectl status", desc: "Affiche la configuration actuelle" },
      { cmd: "timedatectl set-timezone Europe/Paris", desc: "Change le fuseau horaire" }
    ],
    flags: ["status", "set-timezone", "set-ntp"]
  },
  {
    name: "podman",
    os: "rhel",
    category: "Conteneurs",
    description: "Gère des conteneurs sans démon, alternative native à Docker sur RHEL/Fedora.",
    syntax: "podman <commande>",
    examples: [
      { cmd: "podman run -d -p 8080:80 nginx", desc: "Lance un conteneur nginx" },
      { cmd: "podman ps", desc: "Liste les conteneurs actifs" }
    ],
    flags: ["run", "ps", "stop", "rm", "-d (détaché)"]
  },
  {
    name: "ausearch",
    os: "rhel",
    category: "Permissions",
    description: "Recherche dans les journaux d'audit du noyau, utile pour diagnostiquer des refus SELinux.",
    syntax: "ausearch -m avc -ts recent",
    examples: [
      { cmd: "ausearch -m avc -ts recent", desc: "Cherche les refus SELinux récents" },
      { cmd: "ausearch -m avc -ts today | audit2allow", desc: "Génère une règle pour autoriser l'action refusée" }
    ],
    flags: ["-m avc (refus SELinux)", "-ts (depuis quand)"]
  },

  // ── FREEBSD ───────────────────────────────────────────────
  {
    name: "pkg install",
    os: "freebsd",
    category: "Paquets",
    description: "Installe un paquet binaire sur FreeBSD.",
    syntax: "pkg install <paquet>",
    examples: [
      { cmd: "pkg install nginx", desc: "Installe nginx" },
      { cmd: "pkg install -y curl wget", desc: "Sans confirmation" }
    ],
    flags: ["-y (auto-confirmer)", "-q (silencieux)"]
  },
  {
    name: "pkg update",
    os: "freebsd",
    category: "Paquets",
    description: "Met à jour le catalogue des paquets FreeBSD.",
    syntax: "pkg update",
    examples: [
      { cmd: "pkg update", desc: "Met à jour l'index" },
      { cmd: "pkg upgrade", desc: "Met à jour tous les paquets installés" }
    ],
    flags: ["-f (forcer)"]
  },
  {
    name: "pkg delete",
    os: "freebsd",
    category: "Paquets",
    description: "Supprime un paquet installé sur FreeBSD.",
    syntax: "pkg delete <paquet>",
    examples: [
      { cmd: "pkg delete nginx", desc: "Supprime nginx" },
      { cmd: "pkg autoremove", desc: "Supprime les dépendances orphelines" }
    ],
    flags: ["-y", "-R (avec dépendances)"]
  },
  {
    name: "pkg info",
    os: "freebsd",
    category: "Paquets",
    description: "Affiche les informations sur les paquets installés.",
    syntax: "pkg info [paquet]",
    examples: [
      { cmd: "pkg info", desc: "Liste tous les paquets installés" },
      { cmd: "pkg info -l nginx", desc: "Liste les fichiers de nginx" }
    ],
    flags: ["-l (fichiers)", "-d (dépendances)"]
  },
  {
    name: "service",
    os: "freebsd",
    category: "Services",
    description: "Gère les services RC sur FreeBSD.",
    syntax: "service <service> <action>",
    examples: [
      { cmd: "service nginx start", desc: "Démarre nginx" },
      { cmd: "service sshd status", desc: "Statut de sshd" }
    ],
    flags: ["start / stop / restart / status / reload"]
  },
  {
    name: "sysctl",
    os: "freebsd",
    category: "Système",
    description: "Lit et modifie les paramètres du noyau FreeBSD.",
    syntax: "sysctl [nom] [=valeur]",
    examples: [
      { cmd: "sysctl kern.version", desc: "Version du noyau" },
      { cmd: "sysctl net.inet.ip.forwarding=1", desc: "Active le routage IP" }
    ],
    flags: ["-a (tous)", "-w (écriture)"]
  },
  {
    name: "ifconfig (BSD)",
    os: "freebsd",
    category: "Réseau",
    description: "Configure et affiche les interfaces réseau sur FreeBSD.",
    syntax: "ifconfig [interface] [options]",
    examples: [
      { cmd: "ifconfig", desc: "Affiche toutes les interfaces" },
      { cmd: "ifconfig em0 inet 192.168.1.10/24", desc: "Assigne une IP statique" }
    ],
    flags: ["up / down", "inet (IPv4)", "inet6 (IPv6)"]
  },
  {
    name: "pfctl",
    os: "freebsd",
    category: "Réseau",
    description: "Contrôle le pare-feu PF de FreeBSD.",
    syntax: "pfctl [options]",
    examples: [
      { cmd: "pfctl -e", desc: "Active PF" },
      { cmd: "pfctl -f /etc/pf.conf", desc: "Charge les règles" },
      { cmd: "pfctl -s rules", desc: "Affiche les règles actives" }
    ],
    flags: ["-e (enable)", "-d (disable)", "-f (fichier)", "-s (show)"]
  },
  {
    name: "portsnap",
    os: "freebsd",
    category: "Paquets",
    description: "Met à jour l'arbre des ports FreeBSD.",
    syntax: "portsnap <action>",
    examples: [
      { cmd: "portsnap fetch update", desc: "Met à jour l'arbre des ports" }
    ],
    flags: ["fetch / extract / update"]
  },
  {
    name: "bsdinstall",
    os: "freebsd",
    category: "Système",
    description: "Assistant d'installation et de configuration de FreeBSD.",
    syntax: "bsdinstall [composant]",
    examples: [
      { cmd: "bsdinstall netconfig", desc: "Configure uniquement le réseau" }
    ],
    flags: []
  },
  {
    name: "freebsd-update",
    os: "freebsd",
    category: "Système",
    description: "Télécharge et installe les mises à jour de sécurité du système de base FreeBSD.",
    syntax: "freebsd-update <commande>",
    examples: [
      { cmd: "freebsd-update fetch", desc: "Télécharge les mises à jour de sécurité" },
      { cmd: "freebsd-update install", desc: "Installe les mises à jour téléchargées" }
    ],
    flags: ["fetch", "install", "rollback", "-r (upgrade vers une version)"]
  },
  {
    name: "pw useradd",
    os: "freebsd",
    category: "Utilisateurs",
    description: "Crée un utilisateur système via l'outil natif pw de FreeBSD.",
    syntax: "pw useradd <user> -m -G wheel",
    examples: [
      { cmd: "pw useradd tom -m -G wheel -s /bin/sh", desc: "Crée un utilisateur avec home et accès wheel" },
      { cmd: "passwd tom", desc: "Définit le mot de passe" }
    ],
    flags: ["-m (home)", "-G (groupe)", "-s (shell)"]
  },
  {
    name: "zfs / zpool",
    os: "freebsd",
    category: "Système",
    description: "Gère les pools et systèmes de fichiers ZFS, natif et très utilisé sur FreeBSD.",
    syntax: "zpool <action> | zfs <action>",
    examples: [
      { cmd: "zpool status", desc: "État de santé des pools ZFS" },
      { cmd: "zfs snapshot zroot/data@avant-maj", desc: "Crée un snapshot instantané" },
      { cmd: "zfs list", desc: "Liste les systèmes de fichiers ZFS" }
    ],
    flags: ["status", "snapshot", "list", "rollback"]
  },
  {
    name: "jail / jexec",
    os: "freebsd",
    category: "Conteneurs",
    description: "Crée et administre des jails, le mécanisme natif d'isolation/conteneurisation de FreeBSD.",
    syntax: "jail -c <options> | jexec <jail> <commande>",
    examples: [
      { cmd: "jls", desc: "Liste les jails actives" },
      { cmd: "jexec web-jail sh", desc: "Ouvre un shell dans une jail" }
    ],
    flags: ["-c (créer)", "jls (lister)", "jexec (exécuter dedans)"]
  },
  {
    name: "newfs / mount",
    os: "freebsd",
    category: "Système",
    description: "Crée un système de fichiers UFS sur une partition puis le monte.",
    syntax: "newfs <device> ; mount <device> <point_de_montage>",
    examples: [
      { cmd: "newfs /dev/ada1p1", desc: "Formate une partition en UFS" },
      { cmd: "mount /dev/ada1p1 /mnt/data", desc: "Monte la partition" }
    ],
    flags: []
  },
  {
    name: "ports (make install)",
    os: "freebsd",
    category: "Paquets",
    description: "Compile et installe un logiciel depuis l'arborescence des Ports FreeBSD.",
    syntax: "cd /usr/ports/<catégorie>/<logiciel> && make install clean",
    examples: [
      { cmd: "cd /usr/ports/www/nginx && make install clean", desc: "Compile et installe nginx depuis les ports" },
      { cmd: "make config", desc: "Choisit les options de compilation avant install" }
    ],
    flags: ["install", "clean", "config"]
  },
  {
    name: "rc.conf (sysrc)",
    os: "freebsd",
    category: "Services",
    description: "Modifie le fichier /etc/rc.conf en ligne de commande pour activer des services au démarrage.",
    syntax: "sysrc <clé>=<valeur>",
    examples: [
      { cmd: "sysrc nginx_enable=\"YES\"", desc: "Active nginx au démarrage" },
      { cmd: "sysrc -a", desc: "Liste toutes les variables rc.conf" }
    ],
    flags: ["-a (lister tout)", "-x (supprimer une clé)"]
  },
  {
    name: "gpart",
    os: "freebsd",
    category: "Système",
    description: "Gère les tables de partitions (création, redimensionnement) sur FreeBSD.",
    syntax: "gpart <action> <device>",
    examples: [
      { cmd: "gpart show", desc: "Affiche les partitions existantes" },
      { cmd: "gpart create -s gpt ada1", desc: "Crée une table de partitions GPT" }
    ],
    flags: ["show", "create", "add", "delete"]
  },
  {
    name: "tcpdump (FreeBSD)",
    os: "freebsd",
    category: "Réseau",
    description: "Capture et analyse le trafic réseau en ligne de commande.",
    syntax: "tcpdump -i <interface> [filtre]",
    examples: [
      { cmd: "tcpdump -i em0", desc: "Capture tout le trafic sur l'interface em0" },
      { cmd: "tcpdump -i em0 port 80", desc: "Filtre uniquement le trafic HTTP" }
    ],
    flags: ["-i (interface)", "-n (pas de résolution DNS)", "-w (écrire dans un fichier)"]
  },
  {
    name: "tar (FreeBSD)",
    os: "freebsd",
    category: "Archives",
    description: "Crée ou extrait des archives via bsdtar, natif sur FreeBSD.",
    syntax: "tar [options] <archive>",
    examples: [
      { cmd: "tar -czvf backup.tar.gz /etc", desc: "Sauvegarde /etc en archive compressée" },
      { cmd: "tar -xzvf backup.tar.gz -C /restore", desc: "Extrait vers un dossier précis" }
    ],
    flags: ["-c", "-x", "-z", "-v", "-C"]
  },
  {
    name: "periodic",
    os: "freebsd",
    category: "Système",
    description: "Exécute les scripts de maintenance planifiés (quotidiens, hebdo, mensuels) de FreeBSD.",
    syntax: "periodic <daily|weekly|monthly>",
    examples: [
      { cmd: "periodic daily", desc: "Lance manuellement les tâches de maintenance quotidiennes" },
      { cmd: "periodic security", desc: "Lance les vérifications de sécurité" }
    ],
    flags: ["daily", "weekly", "monthly", "security"]
  },

  // ── macOS ─────────────────────────────────────────────────
  {
    name: "brew install",
    os: "macos",
    category: "Paquets",
    description: "Installe un paquet via Homebrew.",
    syntax: "brew install <paquet>",
    examples: [
      { cmd: "brew install git", desc: "Installe git" },
      { cmd: "brew install --cask firefox", desc: "Installe une application GUI" }
    ],
    flags: ["--cask (applications GUI)", "--force"]
  },
  {
    name: "brew update",
    os: "macos",
    category: "Paquets",
    description: "Met à jour Homebrew et la liste des formules.",
    syntax: "brew update",
    examples: [
      { cmd: "brew update", desc: "Met à jour Homebrew" },
      { cmd: "brew upgrade", desc: "Met à jour tous les paquets" }
    ],
    flags: []
  },
  {
    name: "brew uninstall",
    os: "macos",
    category: "Paquets",
    description: "Désinstalle un paquet Homebrew.",
    syntax: "brew uninstall <paquet>",
    examples: [
      { cmd: "brew uninstall git", desc: "Désinstalle git" },
      { cmd: "brew cleanup", desc: "Supprime les anciennes versions" }
    ],
    flags: ["--cask", "cleanup"]
  },
  {
    name: "launchctl",
    os: "macos",
    category: "Services",
    description: "Gère les services launchd (équivalent systemctl sur macOS).",
    syntax: "launchctl <sous-commande>",
    examples: [
      { cmd: "launchctl list", desc: "Liste les services actifs" },
      { cmd: "brew services start nginx", desc: "Méthode recommandée via brew" }
    ],
    flags: ["load / unload / start / stop / list"]
  },
  {
    name: "defaults write",
    os: "macos",
    category: "Système",
    description: "Modifie les préférences système macOS.",
    syntax: "defaults write <domaine> <clé> <valeur>",
    examples: [
      { cmd: "defaults write com.apple.dock autohide -bool true", desc: "Masque le Dock" },
      { cmd: "defaults read com.apple.finder", desc: "Lit les préférences du Finder" }
    ],
    flags: ["write / read / delete"]
  },
  {
    name: "networksetup",
    os: "macos",
    category: "Réseau",
    description: "Configure les paramètres réseau depuis le terminal macOS.",
    syntax: "networksetup <sous-commande>",
    examples: [
      { cmd: "networksetup -listallnetworkservices", desc: "Liste les interfaces" },
      { cmd: "networksetup -setdnsservers Wi-Fi 1.1.1.1", desc: "Définit les DNS" }
    ],
    flags: []
  },
  {
    name: "softwareupdate",
    os: "macos",
    category: "Système",
    description: "Gère les mises à jour macOS depuis le terminal.",
    syntax: "softwareupdate [options]",
    examples: [
      { cmd: "softwareupdate -l", desc: "Liste les mises à jour disponibles" },
      { cmd: "softwareupdate -ia", desc: "Installe toutes les mises à jour" }
    ],
    flags: ["-l (list)", "-i (install)", "-a (all)"]
  },
  {
    name: "diskutil",
    os: "macos",
    category: "Système",
    description: "Gère les disques et volumes sur macOS.",
    syntax: "diskutil <commande>",
    examples: [
      { cmd: "diskutil list", desc: "Liste tous les disques" },
      { cmd: "diskutil unmountDisk /dev/disk2", desc: "Démonte un disque externe" }
    ],
    flags: ["list / info / mount / unmount / eject"]
  },
  {
    name: "brew info",
    os: "macos",
    category: "Paquets",
    description: "Affiche les informations sur un paquet Homebrew.",
    syntax: "brew info <paquet>",
    examples: [
      { cmd: "brew info node", desc: "Infos sur node" },
      { cmd: "brew list", desc: "Liste tous les paquets installés" }
    ],
    flags: []
  },
  {
    name: "osascript",
    os: "macos",
    category: "Système",
    description: "Exécute des scripts AppleScript depuis le terminal.",
    syntax: "osascript -e '<script>'",
    examples: [
      { cmd: "osascript -e 'display notification \"OK\" with title \"CI\"'", desc: "Affiche une notification" },
      { cmd: "osascript -e 'set volume output volume 50'", desc: "Règle le volume à 50%" }
    ],
    flags: ["-e (expression inline)", "-l (langage)"]
  },
  {
    name: "brew cask / brew --cask",
    os: "macos",
    category: "Paquets",
    description: "Installe des applications graphiques complètes via Homebrew Cask.",
    syntax: "brew install --cask <app>",
    examples: [
      { cmd: "brew install --cask firefox", desc: "Installe Firefox" },
      { cmd: "brew list --cask", desc: "Liste les applications cask installées" }
    ],
    flags: ["--cask"]
  },
  {
    name: "dscl",
    os: "macos",
    category: "Utilisateurs",
    description: "Gère les utilisateurs et groupes via Directory Service (équivalent useradd sur macOS).",
    syntax: "dscl . -create /Users/<user>",
    examples: [
      { cmd: "dscl . -list /Users", desc: "Liste tous les utilisateurs" },
      { cmd: "dscl . -create /Users/tom", desc: "Crée un nouvel utilisateur" }
    ],
    flags: ["-create", "-list", "-delete"]
  },
  {
    name: "ifconfig (macOS)",
    os: "macos",
    category: "Réseau",
    description: "Affiche ou configure les interfaces réseau sur macOS.",
    syntax: "ifconfig [interface]",
    examples: [
      { cmd: "ifconfig en0", desc: "Détails de l'interface Wi-Fi/Ethernet principale" },
      { cmd: "ifconfig", desc: "Liste toutes les interfaces" }
    ],
    flags: []
  },
  {
    name: "pfctl (macOS)",
    os: "macos",
    category: "Réseau",
    description: "Contrôle le pare-feu PF intégré à macOS (basé sur BSD).",
    syntax: "sudo pfctl -e | -f <fichier>",
    examples: [
      { cmd: "sudo pfctl -e", desc: "Active le pare-feu PF" },
      { cmd: "sudo pfctl -f /etc/pf.conf", desc: "Charge les règles depuis pf.conf" }
    ],
    flags: ["-e (enable)", "-d (disable)", "-f (charger fichier)"]
  },
  {
    name: "tar (macOS)",
    os: "macos",
    category: "Archives",
    description: "Crée ou extrait des archives via bsdtar, présent nativement sur macOS.",
    syntax: "tar [options] <archive>",
    examples: [
      { cmd: "tar -czvf backup.tar.gz ~/Documents", desc: "Archive un dossier" },
      { cmd: "tar -xzvf backup.tar.gz", desc: "Extrait une archive" }
    ],
    flags: ["-c", "-x", "-z", "-v"]
  },
  {
    name: "ps / top (macOS)",
    os: "macos",
    category: "Processus",
    description: "Liste ou surveille en temps réel les processus en cours sur macOS.",
    syntax: "ps aux | top",
    examples: [
      { cmd: "ps aux | grep Safari", desc: "Cherche les processus Safari" },
      { cmd: "top -o cpu", desc: "Trie les processus par usage CPU en temps réel" }
    ],
    flags: ["-o cpu/mem (tri)", "aux (détails complets)"]
  },
  {
    name: "launchctl load/unload",
    os: "macos",
    category: "Services",
    description: "Charge ou décharge des daemons/agents lancés au démarrage (fichiers .plist).",
    syntax: "launchctl load|unload <fichier.plist>",
    examples: [
      { cmd: "launchctl load /Library/LaunchDaemons/com.app.plist", desc: "Active un daemon au démarrage" },
      { cmd: "launchctl unload /Library/LaunchDaemons/com.app.plist", desc: "Désactive un daemon" }
    ],
    flags: ["load", "unload", "list"]
  },
  {
    name: "spctl",
    os: "macos",
    category: "Permissions",
    description: "Gère Gatekeeper, la protection macOS contre les applications non signées/non identifiées.",
    syntax: "sudo spctl --master-disable | --add <app>",
    examples: [
      { cmd: "sudo spctl --master-disable", desc: "Désactive Gatekeeper (déconseillé en prod)" },
      { cmd: "spctl --status", desc: "Vérifie si Gatekeeper est actif" }
    ],
    flags: ["--master-disable", "--status", "--add"]
  },
  {
    name: "tmutil",
    os: "macos",
    category: "Archives",
    description: "Contrôle Time Machine en ligne de commande pour les sauvegardes.",
    syntax: "tmutil <action>",
    examples: [
      { cmd: "tmutil startbackup", desc: "Lance une sauvegarde Time Machine" },
      { cmd: "tmutil listbackups", desc: "Liste les sauvegardes disponibles" }
    ],
    flags: ["startbackup", "listbackups", "restore"]
  },
  {
    name: "scutil",
    os: "macos",
    category: "Réseau",
    description: "Configure les paramètres système réseau bas niveau (DNS, hostname, proxy).",
    syntax: "scutil --<action>",
    examples: [
      { cmd: "scutil --dns", desc: "Affiche la configuration DNS actuelle" },
      { cmd: "sudo scutil --set HostName monmac.local", desc: "Change le hostname" }
    ],
    flags: ["--dns", "--set", "--get"]
  },
  {
    name: "system_profiler",
    os: "macos",
    category: "Système",
    description: "Affiche des informations détaillées sur le matériel et les logiciels installés.",
    syntax: "system_profiler <type_de_données>",
    examples: [
      { cmd: "system_profiler SPHardwareDataType", desc: "Infos matérielles (CPU, RAM, modèle)" },
      { cmd: "system_profiler SPApplicationsDataType", desc: "Liste les applications installées" }
    ],
    flags: []
  },

  // ── WINDOWS ───────────────────────────────────────────────
  {
    name: "Get-Help",
    os: "windows",
    category: "Système",
    description: "Affiche l'aide d'une commande PowerShell (équivalent de man).",
    syntax: "Get-Help <commande>",
    examples: [
      { cmd: "Get-Help Get-Process", desc: "Aide sur Get-Process" },
      { cmd: "Get-Help Get-Process -Examples", desc: "Uniquement les exemples" }
    ],
    flags: ["-Full", "-Examples", "-Online"]
  },
  {
    name: "Get-Process",
    os: "windows",
    category: "Processus",
    description: "Liste les processus en cours d'exécution (équivalent ps/top).",
    syntax: "Get-Process [nom]",
    examples: [
      { cmd: "Get-Process", desc: "Tous les processus" },
      { cmd: "Get-Process | Sort-Object CPU -Descending | Select -First 10", desc: "Top 10 par CPU" }
    ],
    flags: ["-Name", "-Id"]
  },
  {
    name: "Stop-Process",
    os: "windows",
    category: "Processus",
    description: "Termine un processus en cours (équivalent de kill).",
    syntax: "Stop-Process -Name <nom> | -Id <pid>",
    examples: [
      { cmd: "Stop-Process -Name notepad", desc: "Ferme Notepad" },
      { cmd: "Stop-Process -Id 1234 -Force", desc: "Force la fin du processus" }
    ],
    flags: ["-Name", "-Id", "-Force"]
  },
  {
    name: "Get-Service",
    os: "windows",
    category: "Services",
    description: "Liste l'état des services Windows.",
    syntax: "Get-Service [nom]",
    examples: [
      { cmd: "Get-Service", desc: "Tous les services" },
      { cmd: "Get-Service | Where-Object Status -eq 'Running'", desc: "Services actifs" }
    ],
    flags: ["-Name", "-DisplayName"]
  },
  {
    name: "Start-Service",
    os: "windows",
    category: "Services",
    description: "Démarre ou arrête un service Windows.",
    syntax: "Start-Service -Name <service>",
    examples: [
      { cmd: "Start-Service -Name spooler", desc: "Démarre le spouleur" },
      { cmd: "Restart-Service -Name w32time", desc: "Redémarre le service de temps" }
    ],
    flags: ["-Name", "-Force"]
  },
  {
    name: "winget install",
    os: "windows",
    category: "Paquets",
    description: "Installe une application via le gestionnaire de paquets Windows.",
    syntax: "winget install <id ou nom>",
    examples: [
      { cmd: "winget install Git.Git", desc: "Installe Git" },
      { cmd: "winget upgrade --all", desc: "Met à jour toutes les applis" }
    ],
    flags: ["--id", "-e (exact match)", "--silent"]
  },
  {
    name: "ipconfig",
    os: "windows",
    category: "Réseau",
    description: "Affiche la configuration réseau des interfaces Windows.",
    syntax: "ipconfig [options]",
    examples: [
      { cmd: "ipconfig /all", desc: "Infos complètes (MAC, DNS, DHCP)" },
      { cmd: "ipconfig /flushdns", desc: "Vide le cache DNS" }
    ],
    flags: ["/all", "/flushdns", "/release", "/renew"]
  },
  {
    name: "netstat",
    os: "windows",
    category: "Réseau",
    description: "Affiche les connexions réseau et ports actifs sous Windows.",
    syntax: "netstat [options]",
    examples: [
      { cmd: "netstat -ano", desc: "Toutes les connexions avec PID" },
      { cmd: "netstat -ano | findstr :80", desc: "Connexions sur le port 80" }
    ],
    flags: ["-a (toutes)", "-n (numérique)", "-o (PID)"]
  },
  {
    name: "Set-ExecutionPolicy",
    os: "windows",
    category: "Système",
    description: "Définit la politique d'exécution des scripts PowerShell.",
    syntax: "Set-ExecutionPolicy <policy>",
    examples: [
      { cmd: "Set-ExecutionPolicy RemoteSigned", desc: "Autorise les scripts locaux" },
      { cmd: "Set-ExecutionPolicy Bypass -Scope Process", desc: "Bypass temporaire" }
    ],
    flags: ["Restricted / RemoteSigned / Unrestricted / Bypass", "-Scope"]
  },
  {
    name: "robocopy",
    os: "windows",
    category: "Fichiers",
    description: "Copie robuste de fichiers et dossiers (CMD).",
    syntax: "robocopy <source> <dest> [options]",
    examples: [
      { cmd: "robocopy C:\\src D:\\backup /E", desc: "Copie récursive" },
      { cmd: "robocopy C:\\src D:\\backup /MIR", desc: "Miroir exact" }
    ],
    flags: ["/E (sous-dossiers)", "/MIR (miroir)", "/Z (reprise)", "/R:n (retries)"]
  },
  {
    name: "Get-NetAdapter",
    os: "windows",
    category: "Réseau",
    description: "Affiche les adaptateurs réseau et leur état.",
    syntax: "Get-NetAdapter [-Name <nom>]",
    examples: [
      { cmd: "Get-NetAdapter", desc: "Liste toutes les interfaces réseau" },
      { cmd: "Get-NetAdapter | Where-Object {$_.Status -eq \"Up\"}", desc: "Interfaces actives uniquement" }
    ],
    flags: ["-Name", "-Physical"]
  },
  {
    name: "Test-NetConnection",
    os: "windows",
    category: "Réseau",
    description: "Teste la connectivité réseau vers un hôte (ping avancé + test de port).",
    syntax: "Test-NetConnection <hôte> [-Port <port>]",
    examples: [
      { cmd: "Test-NetConnection google.com", desc: "Ping avancé avec infos de route" },
      { cmd: "Test-NetConnection 192.168.1.10 -Port 3389", desc: "Teste un port spécifique (ex: RDP)" }
    ],
    flags: ["-Port", "-TraceRoute", "-InformationLevel"]
  },
  {
    name: "Get-WinEvent",
    os: "windows",
    category: "Système",
    description: "Consulte les journaux d'événements Windows.",
    syntax: "Get-WinEvent -LogName <journal>",
    examples: [
      { cmd: "Get-WinEvent -LogName System -MaxEvents 20", desc: "20 derniers événements système" },
      { cmd: "Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625}", desc: "Échecs de connexion (logon failure)" }
    ],
    flags: ["-MaxEvents", "-FilterHashtable", "-ComputerName"]
  },
  {
    name: "Get-ChildItem",
    os: "windows",
    category: "Fichiers",
    description: "Liste les fichiers et dossiers d'un répertoire (équivalent ls/dir).",
    syntax: "Get-ChildItem [-Path <chemin>] [-Recurse]",
    examples: [
      { cmd: "Get-ChildItem C:\\Users", desc: "Liste le contenu d'un dossier" },
      { cmd: "Get-ChildItem -Recurse -Filter *.log", desc: "Recherche récursive de fichiers .log" }
    ],
    flags: ["-Recurse", "-Filter", "-Force (fichiers cachés)"]
  },
  {
    name: "New-Item / Remove-Item",
    os: "windows",
    category: "Fichiers",
    description: "Crée ou supprime un fichier, dossier ou autre élément du système de fichiers.",
    syntax: "New-Item -Path <chemin> -ItemType <type> | Remove-Item <chemin>",
    examples: [
      { cmd: "New-Item -Path C:\\Logs -ItemType Directory", desc: "Crée un dossier" },
      { cmd: "Remove-Item C:\\temp\\*.tmp -Force", desc: "Supprime des fichiers temporaires" }
    ],
    flags: ["-ItemType", "-Force", "-Recurse"]
  },
  {
    name: "Get-LocalUser / New-LocalUser",
    os: "windows",
    category: "Utilisateurs",
    description: "Liste ou crée des utilisateurs locaux sur un poste Windows (hors domaine).",
    syntax: "Get-LocalUser | New-LocalUser -Name <user> -Password <securestring>",
    examples: [
      { cmd: "Get-LocalUser", desc: "Liste les comptes locaux" },
      { cmd: "New-LocalUser -Name \"invite\" -NoPassword", desc: "Crée un utilisateur local sans mot de passe" }
    ],
    flags: ["-Name", "-Password", "-NoPassword"]
  },
  {
    name: "Add-LocalGroupMember",
    os: "windows",
    category: "Utilisateurs",
    description: "Ajoute un utilisateur local à un groupe (ex: Administrateurs).",
    syntax: "Add-LocalGroupMember -Group <groupe> -Member <user>",
    examples: [
      { cmd: "Add-LocalGroupMember -Group \"Administrateurs\" -Member \"tom\"", desc: "Donne les droits admin local à tom" }
    ],
    flags: ["-Group", "-Member"]
  },
  {
    name: "Get-Disk / Get-Volume",
    os: "windows",
    category: "Système",
    description: "Affiche les disques physiques et volumes montés sur la machine.",
    syntax: "Get-Disk | Get-Volume",
    examples: [
      { cmd: "Get-Disk", desc: "Liste les disques physiques" },
      { cmd: "Get-Volume", desc: "Affiche l'espace utilisé/libre par volume" }
    ],
    flags: []
  },
  {
    name: "Restart-Computer / Stop-Computer",
    os: "windows",
    category: "Système",
    description: "Redémarre ou éteint la machine, localement ou à distance.",
    syntax: "Restart-Computer [-ComputerName <hôte>] [-Force]",
    examples: [
      { cmd: "Restart-Computer -Force", desc: "Redémarre immédiatement sans confirmation" },
      { cmd: "Restart-Computer -ComputerName PC-02 -Force", desc: "Redémarre un poste distant" }
    ],
    flags: ["-Force", "-ComputerName", "-Wait"]
  },
  {
    name: "Set-NetFirewallRule / New-NetFirewallRule",
    os: "windows",
    category: "Réseau",
    description: "Gère les règles du pare-feu Windows Defender en ligne de commande.",
    syntax: "New-NetFirewallRule -DisplayName <nom> -Direction <In|Out> -Action <Allow|Block> -Protocol <TCP|UDP> -LocalPort <port>",
    examples: [
      { cmd: "New-NetFirewallRule -DisplayName \"Autoriser RDP\" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 3389", desc: "Ouvre le port RDP" }
    ],
    flags: ["-Direction", "-Action", "-Protocol", "-LocalPort"]
  },
  {
    name: "Compress-Archive / Expand-Archive",
    os: "windows",
    category: "Archives",
    description: "Compresse ou extrait des archives ZIP nativement en PowerShell.",
    syntax: "Compress-Archive -Path <source> -DestinationPath <zip> | Expand-Archive -Path <zip> -DestinationPath <dossier>",
    examples: [
      { cmd: "Compress-Archive -Path C:\\Logs -DestinationPath C:\\logs.zip", desc: "Compresse un dossier en ZIP" },
      { cmd: "Expand-Archive -Path C:\\logs.zip -DestinationPath C:\\extracted", desc: "Extrait une archive ZIP" }
    ],
    flags: ["-Path", "-DestinationPath", "-Force"]
  },
  {
    name: "chkdsk",
    os: "windows",
    category: "Système",
    description: "Vérifie et répare les erreurs du système de fichiers sur un disque.",
    syntax: "chkdsk <lecteur> [/f] [/r]",
    examples: [
      { cmd: "chkdsk C: /f", desc: "Corrige les erreurs détectées sur le disque C:" },
      { cmd: "chkdsk C: /r", desc: "Recherche les secteurs défectueux et tente la récupération" }
    ],
    flags: ["/f (fix)", "/r (recover bad sectors)", "/x (forcer le démontage)"]
  },

  // ── POWERSHELL ────────────────────────────────────────────
  {
    name: "Get-Content",
    os: "powershell",
    category: "Fichiers",
    description: "Lit le contenu d'un fichier (équivalent de cat).",
    syntax: "Get-Content <chemin>",
    examples: [
      { cmd: "Get-Content C:\\logs\\app.log", desc: "Affiche le fichier" },
      { cmd: "Get-Content app.log -Tail 50", desc: "50 dernières lignes" },
      { cmd: "Get-Content app.log -Wait", desc: "Suit le fichier en temps réel (comme tail -f)" }
    ],
    flags: ["-Tail n (dernières lignes)", "-Wait (follow)", "-Encoding"]
  },
  {
    name: "Set-Location",
    os: "powershell",
    category: "Navigation",
    description: "Change le répertoire courant (équivalent de cd).",
    syntax: "Set-Location <chemin>",
    examples: [
      { cmd: "Set-Location C:\\Users\\tom", desc: "Va dans le dossier tom" },
      { cmd: "cd C:\\Projects", desc: "Alias cd fonctionne aussi" },
      { cmd: "Push-Location C:\\tmp", desc: "Change et empile le chemin précédent" }
    ],
    flags: ["Push-Location / Pop-Location (pile de chemins)"]
  },
  {
    name: "Invoke-WebRequest",
    os: "powershell",
    category: "Réseau",
    description: "Effectue des requêtes HTTP (équivalent de curl/wget).",
    syntax: "Invoke-WebRequest -Uri <url>",
    examples: [
      { cmd: "Invoke-WebRequest -Uri https://example.com", desc: "Requête GET simple" },
      { cmd: "iwr https://example.com/file.zip -OutFile file.zip", desc: "Télécharge un fichier" },
      { cmd: "Invoke-WebRequest -Uri https://api.example.com -Method POST -Body $body", desc: "Requête POST" }
    ],
    flags: ["-Uri", "-Method", "-OutFile", "-Headers", "-Body"]
  },
  {
    name: "Where-Object",
    os: "powershell",
    category: "Système",
    description: "Filtre les objets dans un pipeline selon une condition.",
    syntax: "... | Where-Object { $_.propriété -opérateur valeur }",
    examples: [
      { cmd: "Get-Process | Where-Object { $_.CPU -gt 10 }", desc: "Processus avec CPU > 10" },
      { cmd: "Get-Service | Where-Object Status -eq 'Running'", desc: "Services actifs" },
      { cmd: "Get-ChildItem | Where-Object { $_.Extension -eq '.log' }", desc: "Fichiers .log uniquement" }
    ],
    flags: ["-eq / -ne / -gt / -lt / -like / -match"]
  },
  {
    name: "Select-Object",
    os: "powershell",
    category: "Système",
    description: "Sélectionne des propriétés spécifiques ou un nombre limité d'objets.",
    syntax: "... | Select-Object <propriétés>",
    examples: [
      { cmd: "Get-Process | Select-Object Name, CPU, Id", desc: "Affiche nom, CPU et PID" },
      { cmd: "Get-Process | Select-Object -First 5", desc: "Les 5 premiers processus" },
      { cmd: "Get-Service | Select-Object -Property *", desc: "Toutes les propriétés" }
    ],
    flags: ["-First n", "-Last n", "-Property", "-Unique", "-ExpandProperty"]
  },
  {
    name: "Export-Csv",
    os: "powershell",
    category: "Fichiers",
    description: "Exporte des objets PowerShell vers un fichier CSV.",
    syntax: "... | Export-Csv -Path <fichier>",
    examples: [
      { cmd: "Get-Process | Export-Csv -Path procs.csv -NoTypeInformation", desc: "Exporte les processus en CSV" },
      { cmd: "Get-Service | Export-Csv services.csv -Encoding UTF8", desc: "Services en CSV UTF-8" }
    ],
    flags: ["-Path", "-NoTypeInformation", "-Encoding", "-Delimiter", "-Append"]
  },
  {
    name: "ForEach-Object",
    os: "powershell",
    category: "Système",
    description: "Exécute un bloc de script pour chaque élément d'une collection (équivalent foreach en pipeline).",
    syntax: "... | ForEach-Object { <script> }",
    examples: [
      { cmd: "Get-Service | ForEach-Object { $_.Name }", desc: "Affiche le nom de chaque service" },
      { cmd: "1..5 | ForEach-Object { $_ * 2 }", desc: "Double chaque nombre de 1 à 5" }
    ],
    flags: ["-Begin", "-Process", "-End"]
  },
  {
    name: "New-Object",
    os: "powershell",
    category: "Système",
    description: "Crée une instance d'un objet .NET ou COM.",
    syntax: "New-Object -TypeName <type> [-ArgumentList <args>]",
    examples: [
      { cmd: "New-Object System.Net.WebClient", desc: "Crée un objet WebClient" },
      { cmd: "New-Object -TypeName PSObject -Property @{Nom=\"Tom\"}", desc: "Crée un objet personnalisé" }
    ],
    flags: ["-TypeName", "-ArgumentList", "-Property"]
  },
  {
    name: "Invoke-Command",
    os: "powershell",
    category: "Système",
    description: "Exécute des commandes sur un ou plusieurs ordinateurs distants via PowerShell Remoting.",
    syntax: "Invoke-Command -ComputerName <hôte> -ScriptBlock { <script> }",
    examples: [
      { cmd: "Invoke-Command -ComputerName SRV01 -ScriptBlock { Get-Service }", desc: "Exécute une commande à distance" },
      { cmd: "Invoke-Command -ComputerName SRV01,SRV02 -ScriptBlock { Restart-Service spooler }", desc: "Sur plusieurs serveurs à la fois" }
    ],
    flags: ["-ComputerName", "-ScriptBlock", "-Credential", "-AsJob"]
  },
  {
    name: "Test-Path",
    os: "powershell",
    category: "Fichiers",
    description: "Vérifie si un chemin (fichier, dossier, clé de registre) existe.",
    syntax: "Test-Path <chemin>",
    examples: [
      { cmd: "Test-Path C:\\Logs", desc: "Vérifie si le dossier existe" },
      { cmd: "if (Test-Path C:\\config.ini) { Write-Host \"OK\" }", desc: "Condition basée sur l'existence" }
    ],
    flags: ["-PathType Leaf|Container"]
  },
  {
    name: "Out-File / Tee-Object",
    os: "powershell",
    category: "Fichiers",
    description: "Redirige la sortie d'une commande vers un fichier texte.",
    syntax: "... | Out-File -FilePath <fichier>",
    examples: [
      { cmd: "Get-Process | Out-File -FilePath procs.txt", desc: "Écrit la sortie dans un fichier" },
      { cmd: "Get-Service | Tee-Object -FilePath log.txt", desc: "Affiche ET écrit simultanément" }
    ],
    flags: ["-FilePath", "-Append", "-Encoding"]
  },
  {
    name: "Get-EventLog",
    os: "powershell",
    category: "Système",
    description: "Consulte les journaux d'événements classiques (équivalent historique de Get-WinEvent).",
    syntax: "Get-EventLog -LogName <journal> -Newest <n>",
    examples: [
      { cmd: "Get-EventLog -LogName Application -Newest 10", desc: "10 derniers événements applicatifs" },
      { cmd: "Get-EventLog -LogName System -EntryType Error", desc: "Uniquement les erreurs système" }
    ],
    flags: ["-Newest", "-EntryType", "-Source"]
  },
  {
    name: "Get-WmiObject / Get-CimInstance",
    os: "powershell",
    category: "Système",
    description: "Interroge les classes WMI/CIM pour obtenir des infos matérielles ou système détaillées.",
    syntax: "Get-CimInstance -ClassName <classe>",
    examples: [
      { cmd: "Get-CimInstance -ClassName Win32_OperatingSystem", desc: "Infos sur le système d'exploitation" },
      { cmd: "Get-CimInstance -ClassName Win32_LogicalDisk", desc: "Infos sur les disques logiques" }
    ],
    flags: ["-ClassName", "-ComputerName", "-Filter"]
  },
  {
    name: "$PSVersionTable",
    os: "powershell",
    category: "Système",
    description: "Affiche la version de PowerShell installée et les détails de l'édition (Core/Desktop).",
    syntax: "$PSVersionTable",
    examples: [
      { cmd: "$PSVersionTable", desc: "Affiche toutes les infos de version" },
      { cmd: "$PSVersionTable.PSVersion", desc: "Affiche uniquement le numéro de version" }
    ],
    flags: []
  },
  {
    name: "Import-Module / Get-Module",
    os: "powershell",
    category: "Système",
    description: "Charge un module PowerShell (ex: ActiveDirectory) pour accéder à ses cmdlets.",
    syntax: "Import-Module <nom>",
    examples: [
      { cmd: "Import-Module ActiveDirectory", desc: "Charge les cmdlets AD" },
      { cmd: "Get-Module -ListAvailable", desc: "Liste tous les modules installés" }
    ],
    flags: ["-ListAvailable", "-Force"]
  },
  {
    name: "ConvertTo-Json / ConvertFrom-Json",
    os: "powershell",
    category: "Fichiers",
    description: "Convertit des objets PowerShell en JSON ou parse du JSON en objets.",
    syntax: "... | ConvertTo-Json | ConvertFrom-Json <chaîne>",
    examples: [
      { cmd: "Get-Process | Select -First 3 | ConvertTo-Json", desc: "Convertit en JSON" },
      { cmd: "Get-Content data.json | ConvertFrom-Json", desc: "Parse un fichier JSON" }
    ],
    flags: ["-Depth"]
  },
  {
    name: "Start-Job / Get-Job",
    os: "powershell",
    category: "Processus",
    description: "Exécute une tâche en arrière-plan (job) sans bloquer la console.",
    syntax: "Start-Job -ScriptBlock { <script> }",
    examples: [
      { cmd: "Start-Job -ScriptBlock { Get-Process }", desc: "Lance une tâche en arrière-plan" },
      { cmd: "Get-Job | Receive-Job", desc: "Récupère le résultat des jobs terminés" }
    ],
    flags: ["-ScriptBlock", "-Name"]
  },
  {
    name: "Measure-Object",
    os: "powershell",
    category: "Système",
    description: "Calcule des statistiques (somme, moyenne, min, max, nombre) sur une collection d'objets.",
    syntax: "... | Measure-Object [-Property <prop>] [-Sum|-Average]",
    examples: [
      { cmd: "Get-Process | Measure-Object", desc: "Compte le nombre de processus" },
      { cmd: "Get-ChildItem | Measure-Object -Property Length -Sum", desc: "Taille totale des fichiers d'un dossier" }
    ],
    flags: ["-Sum", "-Average", "-Maximum", "-Minimum", "-Property"]
  },
  {
    name: "Sort-Object",
    os: "powershell",
    category: "Système",
    description: "Trie les objets d'une collection selon une ou plusieurs propriétés.",
    syntax: "... | Sort-Object -Property <prop> [-Descending]",
    examples: [
      { cmd: "Get-Process | Sort-Object CPU -Descending", desc: "Trie les processus par CPU décroissant" },
      { cmd: "Get-ChildItem | Sort-Object Length", desc: "Trie les fichiers par taille croissante" }
    ],
    flags: ["-Property", "-Descending", "-Unique"]
  },

  // ── DOCKER ────────────────────────────────────────────────
  {
    name: "docker run",
    os: "docker",
    category: "Conteneurs",
    description: "Crée et démarre un conteneur depuis une image.",
    syntax: "docker run [options] <image> [commande]",
    examples: [
      { cmd: "docker run -d -p 80:80 nginx", desc: "Nginx en arrière-plan sur le port 80" },
      { cmd: "docker run -it ubuntu bash", desc: "Ubuntu interactif avec bash" },
      { cmd: "docker run --rm -v $(pwd):/app node:18 node app.js", desc: "Exécute node et supprime le conteneur après" }
    ],
    flags: ["-d (détaché)", "-p (ports)", "-v (volumes)", "--rm (auto-suppression)", "-e (variables env)", "--name"]
  },
  {
    name: "docker ps",
    os: "docker",
    category: "Conteneurs",
    description: "Liste les conteneurs en cours d'exécution.",
    syntax: "docker ps [options]",
    examples: [
      { cmd: "docker ps", desc: "Conteneurs actifs" },
      { cmd: "docker ps -a", desc: "Tous les conteneurs (actifs + arrêtés)" },
      { cmd: "docker ps --format 'table {{.Names}}\\t{{.Status}}'", desc: "Format personnalisé" }
    ],
    flags: ["-a (tous)", "-q (IDs seulement)", "--format"]
  },
  {
    name: "docker build",
    os: "docker",
    category: "Conteneurs",
    description: "Construit une image depuis un Dockerfile.",
    syntax: "docker build [options] <contexte>",
    examples: [
      { cmd: "docker build -t monapp:1.0 .", desc: "Construit avec le tag monapp:1.0" },
      { cmd: "docker build --no-cache -t monapp .", desc: "Sans cache (rebuild complet)" },
      { cmd: "docker build -f Dockerfile.prod -t monapp:prod .", desc: "Dockerfile spécifique" }
    ],
    flags: ["-t (tag)", "-f (Dockerfile)", "--no-cache", "--build-arg"]
  },
  {
    name: "docker-compose up",
    os: "docker",
    category: "Conteneurs",
    description: "Démarre tous les services définis dans docker-compose.yml.",
    syntax: "docker-compose up [options]",
    examples: [
      { cmd: "docker-compose up -d", desc: "Démarre en arrière-plan" },
      { cmd: "docker-compose up --build", desc: "Rebuild les images avant de démarrer" },
      { cmd: "docker-compose up -d nginx db", desc: "Démarre uniquement nginx et db" }
    ],
    flags: ["-d (détaché)", "--build (rebuild)", "--force-recreate", "--scale service=n"]
  },
  {
    name: "docker logs",
    os: "docker",
    category: "Conteneurs",
    description: "Affiche les logs d'un conteneur.",
    syntax: "docker logs [options] <conteneur>",
    examples: [
      { cmd: "docker logs mon-nginx", desc: "Logs de mon-nginx" },
      { cmd: "docker logs -f --tail 100 mon-nginx", desc: "Suit les 100 dernières lignes" },
      { cmd: "docker logs --since 1h mon-nginx", desc: "Logs de la dernière heure" }
    ],
    flags: ["-f (follow)", "--tail n", "--since", "--timestamps"]
  },
  {
    name: "docker exec",
    os: "docker",
    category: "Conteneurs",
    description: "Exécute une commande dans un conteneur en cours d'exécution.",
    syntax: "docker exec [options] <conteneur> <commande>",
    examples: [
      { cmd: "docker exec -it mon-nginx bash", desc: "Shell interactif dans le conteneur" },
      { cmd: "docker exec mon-nginx nginx -t", desc: "Vérifie la config nginx" },
      { cmd: "docker exec -it db psql -U postgres", desc: "Connexion PostgreSQL" }
    ],
    flags: ["-i (interactif)", "-t (TTY)", "-e (variable env)", "-u (utilisateur)"]
  },
  {
    name: "docker stop / docker rm",
    os: "docker",
    category: "Conteneurs",
    description: "Arrête puis supprime un ou plusieurs conteneurs.",
    syntax: "docker stop <conteneur> ; docker rm <conteneur>",
    examples: [
      { cmd: "docker stop mon-nginx", desc: "Arrête proprement le conteneur" },
      { cmd: "docker rm mon-nginx", desc: "Supprime le conteneur arrêté" },
      { cmd: "docker rm -f mon-nginx", desc: "Force l'arrêt et la suppression" }
    ],
    flags: ["-f (forcer)", "-v (supprimer les volumes associés)"]
  },
  {
    name: "docker images / docker rmi",
    os: "docker",
    category: "Conteneurs",
    description: "Liste les images locales ou en supprime une.",
    syntax: "docker images ; docker rmi <image>",
    examples: [
      { cmd: "docker images", desc: "Liste toutes les images locales" },
      { cmd: "docker rmi nginx:latest", desc: "Supprime une image" }
    ],
    flags: ["-a (toutes, y compris intermédiaires)", "-f (forcer)"]
  },
  {
    name: "docker pull / docker push",
    os: "docker",
    category: "Conteneurs",
    description: "Télécharge une image depuis un registry ou y publie une image locale.",
    syntax: "docker pull <image> ; docker push <image>",
    examples: [
      { cmd: "docker pull nginx:latest", desc: "Télécharge l'image officielle nginx" },
      { cmd: "docker push monregistry.io/monapp:1.0", desc: "Publie l'image vers un registry privé" }
    ],
    flags: []
  },
  {
    name: "docker network",
    os: "docker",
    category: "Conteneurs",
    description: "Crée et gère les réseaux virtuels pour connecter des conteneurs entre eux.",
    syntax: "docker network <action>",
    examples: [
      { cmd: "docker network create mon-reseau", desc: "Crée un réseau bridge personnalisé" },
      { cmd: "docker network connect mon-reseau mon-conteneur", desc: "Connecte un conteneur au réseau" },
      { cmd: "docker network ls", desc: "Liste les réseaux existants" }
    ],
    flags: ["create", "connect", "ls", "rm", "inspect"]
  },
  {
    name: "docker volume",
    os: "docker",
    category: "Conteneurs",
    description: "Crée et gère les volumes pour persister les données en dehors du conteneur.",
    syntax: "docker volume <action>",
    examples: [
      { cmd: "docker volume create mes-donnees", desc: "Crée un volume nommé" },
      { cmd: "docker run -v mes-donnees:/data nginx", desc: "Monte le volume dans un conteneur" },
      { cmd: "docker volume ls", desc: "Liste les volumes" }
    ],
    flags: ["create", "ls", "rm", "inspect", "prune"]
  },
  {
    name: "docker-compose down",
    os: "docker",
    category: "Conteneurs",
    description: "Arrête et supprime tous les conteneurs définis dans un docker-compose.yml.",
    syntax: "docker-compose down [-v]",
    examples: [
      { cmd: "docker-compose down", desc: "Arrête la stack (conserve les volumes)" },
      { cmd: "docker-compose down -v", desc: "Arrête et supprime aussi les volumes" }
    ],
    flags: ["-v (supprimer volumes)", "--rmi all (supprimer images)"]
  },
  {
    name: "docker-compose logs",
    os: "docker",
    category: "Conteneurs",
    description: "Affiche les logs de tous les services d'une stack docker-compose.",
    syntax: "docker-compose logs [-f] [service]",
    examples: [
      { cmd: "docker-compose logs -f", desc: "Suit les logs de tous les services" },
      { cmd: "docker-compose logs -f web", desc: "Suit uniquement le service web" }
    ],
    flags: ["-f (follow)", "--tail n"]
  },
  {
    name: "docker inspect",
    os: "docker",
    category: "Conteneurs",
    description: "Affiche les détails complets (config, réseau, montages) d'un conteneur ou d'une image en JSON.",
    syntax: "docker inspect <conteneur|image>",
    examples: [
      { cmd: "docker inspect mon-nginx", desc: "Détails complets du conteneur" },
      { cmd: "docker inspect -f '{{.NetworkSettings.IPAddress}}' mon-nginx", desc: "Extrait juste l'IP du conteneur" }
    ],
    flags: ["-f (format Go template)"]
  },
  {
    name: "docker stats",
    os: "docker",
    category: "Conteneurs",
    description: "Affiche en temps réel l'utilisation CPU/RAM/réseau des conteneurs actifs.",
    syntax: "docker stats [conteneur]",
    examples: [
      { cmd: "docker stats", desc: "Statistiques en direct de tous les conteneurs" },
      { cmd: "docker stats --no-stream", desc: "Affiche un instantané sans rafraîchir" }
    ],
    flags: ["--no-stream"]
  },
  {
    name: "docker system prune",
    os: "docker",
    category: "Conteneurs",
    description: "Nettoie les ressources Docker inutilisées (conteneurs arrêtés, images orphelines, réseaux, cache).",
    syntax: "docker system prune [-a] [--volumes]",
    examples: [
      { cmd: "docker system prune", desc: "Nettoie les ressources inutilisées de base" },
      { cmd: "docker system prune -a --volumes", desc: "Nettoyage complet, y compris volumes" }
    ],
    flags: ["-a (tout, y compris images non utilisées)", "--volumes"]
  },
  {
    name: "docker tag",
    os: "docker",
    category: "Conteneurs",
    description: "Crée un alias (tag) pour une image, souvent utilisé avant un push vers un registry.",
    syntax: "docker tag <image_source> <image_cible>",
    examples: [
      { cmd: "docker tag monapp:latest monregistry.io/monapp:1.0", desc: "Tag pour un registry privé" }
    ],
    flags: []
  },
  {
    name: "docker cp",
    os: "docker",
    category: "Conteneurs",
    description: "Copie des fichiers entre l'hôte et un conteneur.",
    syntax: "docker cp <source> <conteneur>:<destination>",
    examples: [
      { cmd: "docker cp ./config.conf mon-nginx:/etc/nginx/", desc: "Copie un fichier vers le conteneur" },
      { cmd: "docker cp mon-nginx:/var/log/nginx/error.log ./", desc: "Copie un fichier depuis le conteneur" }
    ],
    flags: []
  },
  {
    name: "docker restart",
    os: "docker",
    category: "Conteneurs",
    description: "Redémarre un conteneur en cours d'exécution.",
    syntax: "docker restart <conteneur>",
    examples: [
      { cmd: "docker restart mon-nginx", desc: "Redémarre le conteneur" },
      { cmd: "docker restart --time 30 mon-nginx", desc: "Redémarre avec un délai d'arrêt étendu" }
    ],
    flags: ["--time / -t (délai avant kill)"]
  },
  {
    name: "Dockerfile (build multi-stage)",
    os: "docker",
    category: "Conteneurs",
    description: "Référence rapide de la syntaxe Dockerfile pour construire une image multi-étapes optimisée.",
    syntax: "FROM <image> AS <étape> ... COPY --from=<étape>",
    examples: [
      { cmd: "FROM node:20 AS build", desc: "Étape de build avec toutes les dépendances" },
      { cmd: "COPY --from=build /app/dist /usr/share/nginx/html", desc: "Récupère uniquement le résultat compilé" }
    ],
    flags: ["FROM", "RUN", "COPY", "EXPOSE", "CMD", "ENTRYPOINT"]
  },

  // ── ANSIBLE ───────────────────────────────────────────────
  {
    name: "ansible",
    os: "ansible",
    category: "Système",
    description: "Exécute une commande ad-hoc sur des hôtes distants.",
    syntax: "ansible <hôtes> -m <module> -a '<arguments>'",
    examples: [
      { cmd: "ansible all -m ping", desc: "Vérifie la connectivité de tous les hôtes" },
      { cmd: "ansible webservers -m shell -a 'uptime'", desc: "Exécute uptime sur les webservers" },
      { cmd: "ansible db -m copy -a 'src=app.conf dest=/etc/app.conf'", desc: "Copie un fichier" }
    ],
    flags: ["-m (module)", "-a (arguments)", "-i (inventaire)", "-u (utilisateur)", "--become (sudo)"]
  },
  {
    name: "ansible-playbook",
    os: "ansible",
    category: "Système",
    description: "Exécute un playbook Ansible (fichier YAML de tâches automatisées).",
    syntax: "ansible-playbook <playbook.yml>",
    examples: [
      { cmd: "ansible-playbook deploy.yml", desc: "Exécute le playbook deploy.yml" },
      { cmd: "ansible-playbook deploy.yml --check", desc: "Mode dry-run (simulation)" },
      { cmd: "ansible-playbook deploy.yml -l webservers -t nginx", desc: "Limite aux webservers, tag nginx" }
    ],
    flags: ["--check (dry-run)", "-l (limit)", "-t (tags)", "--skip-tags", "-v / -vvv (verbosité)"]
  },
  {
    name: "ansible-vault",
    os: "ansible",
    category: "Système",
    description: "Chiffre et déchiffre des fichiers de secrets Ansible.",
    syntax: "ansible-vault <action> <fichier>",
    examples: [
      { cmd: "ansible-vault create secrets.yml", desc: "Crée un fichier chiffré" },
      { cmd: "ansible-vault encrypt vars/passwords.yml", desc: "Chiffre un fichier existant" },
      { cmd: "ansible-vault view secrets.yml", desc: "Affiche sans déchiffrer sur disque" }
    ],
    flags: ["create / encrypt / decrypt / view / edit / rekey"]
  },
  {
    name: "ansible-inventory",
    os: "ansible",
    category: "Système",
    description: "Affiche et manipule l'inventaire Ansible.",
    syntax: "ansible-inventory [options]",
    examples: [
      { cmd: "ansible-inventory --list", desc: "Affiche l'inventaire complet en JSON" },
      { cmd: "ansible-inventory --graph", desc: "Affiche la hiérarchie des groupes" },
      { cmd: "ansible-inventory -i hosts.ini --list", desc: "Inventaire depuis un fichier spécifique" }
    ],
    flags: ["--list", "--graph", "--host <hôte>", "-i (inventaire)"]
  },
  {
    name: "ansible-galaxy",
    os: "ansible",
    category: "Paquets",
    description: "Gère les rôles et collections Ansible depuis Ansible Galaxy.",
    syntax: "ansible-galaxy <action>",
    examples: [
      { cmd: "ansible-galaxy install geerlingguy.nginx", desc: "Installe un rôle" },
      { cmd: "ansible-galaxy collection install community.docker", desc: "Installe une collection" },
      { cmd: "ansible-galaxy install -r requirements.yml", desc: "Installe depuis un fichier requirements" }
    ],
    flags: ["install / remove / list / init / search"]
  },
  {
    name: "ansible-doc",
    os: "ansible",
    category: "Système",
    description: "Affiche la documentation d'un module Ansible.",
    syntax: "ansible-doc <module>",
    examples: [
      { cmd: "ansible-doc copy", desc: "Doc du module copy" },
      { cmd: "ansible-doc -l", desc: "Liste tous les modules disponibles" },
      { cmd: "ansible-doc -s apt", desc: "Snippet YAML du module apt" }
    ],
    flags: ["-l (list)", "-s (snippet)", "-t (type : module/role/...)"]
  },
  {
    name: "ansible-playbook --check",
    os: "ansible",
    category: "Système",
    description: "Simule l'exécution d'un playbook sans appliquer réellement les changements (dry-run).",
    syntax: "ansible-playbook <playbook.yml> --check --diff",
    examples: [
      { cmd: "ansible-playbook site.yml --check", desc: "Mode simulation, aucune modification" },
      { cmd: "ansible-playbook site.yml --check --diff", desc: "Simulation + affiche les différences" }
    ],
    flags: ["--check", "--diff", "--limit"]
  },
  {
    name: "ansible-playbook --limit",
    os: "ansible",
    category: "Système",
    description: "Restreint l'exécution d'un playbook à un sous-ensemble d'hôtes de l'inventaire.",
    syntax: "ansible-playbook <playbook.yml> --limit <groupe|hôte>",
    examples: [
      { cmd: "ansible-playbook site.yml --limit webservers", desc: "N'exécute que sur le groupe webservers" },
      { cmd: "ansible-playbook site.yml --limit srv01.nexa.local", desc: "N'exécute que sur un hôte précis" }
    ],
    flags: ["--limit", "--tags", "--skip-tags"]
  },
  {
    name: "ansible-playbook --tags",
    os: "ansible",
    category: "Système",
    description: "Exécute uniquement certaines tâches d'un playbook, identifiées par des tags.",
    syntax: "ansible-playbook <playbook.yml> --tags <tag1,tag2>",
    examples: [
      { cmd: "ansible-playbook site.yml --tags \"nginx,firewall\"", desc: "N'exécute que les tâches taggées" },
      { cmd: "ansible-playbook site.yml --skip-tags debug", desc: "Saute les tâches taggées debug" }
    ],
    flags: ["--tags", "--skip-tags"]
  },
  {
    name: "ansible all -m ping",
    os: "ansible",
    category: "Système",
    description: "Vérifie la connectivité Ansible (SSH + Python) vers tous les hôtes de l'inventaire.",
    syntax: "ansible all -m ping [-i <inventaire>]",
    examples: [
      { cmd: "ansible all -m ping", desc: "Teste tous les hôtes de l'inventaire par défaut" },
      { cmd: "ansible webservers -m ping -i inventory.ini", desc: "Teste un groupe avec un inventaire précis" }
    ],
    flags: ["-m (module)", "-i (inventaire)"]
  },
  {
    name: "ansible -m setup",
    os: "ansible",
    category: "Système",
    description: "Récupère les facts système (OS, RAM, IP, disques...) d'un ou plusieurs hôtes.",
    syntax: "ansible <hôtes> -m setup [-a 'filter=<motif>']",
    examples: [
      { cmd: "ansible webservers -m setup", desc: "Récupère tous les facts système" },
      { cmd: "ansible all -m setup -a 'filter=ansible_distribution*'", desc: "Filtre uniquement les facts de distribution" }
    ],
    flags: ["-a (arguments du module)"]
  },
  {
    name: "ansible -m shell",
    os: "ansible",
    category: "Système",
    description: "Exécute une commande shell brute sur les hôtes distants (mode ad-hoc).",
    syntax: "ansible <hôtes> -m shell -a '<commande>'",
    examples: [
      { cmd: "ansible webservers -m shell -a 'systemctl status nginx'", desc: "Exécute une commande shell distante" },
      { cmd: "ansible all -m command -a 'uptime'", desc: "Variante sécurisée sans interprétation shell" }
    ],
    flags: ["-a (commande)", "-b (become/sudo)"]
  },
  {
    name: "ansible-config",
    os: "ansible",
    category: "Système",
    description: "Affiche ou vérifie la configuration active d'Ansible (ansible.cfg).",
    syntax: "ansible-config <action>",
    examples: [
      { cmd: "ansible-config view", desc: "Affiche le fichier de config actif" },
      { cmd: "ansible-config dump --only-changed", desc: "Affiche uniquement les paramètres modifiés" }
    ],
    flags: ["view", "dump", "list"]
  },
  {
    name: "ansible-vault view / edit",
    os: "ansible",
    category: "Système",
    description: "Consulte ou édite un fichier chiffré par ansible-vault sans le déchiffrer durablement.",
    syntax: "ansible-vault view|edit <fichier>",
    examples: [
      { cmd: "ansible-vault view secrets.yml", desc: "Affiche le contenu déchiffré temporairement" },
      { cmd: "ansible-vault edit secrets.yml", desc: "Édite directement le fichier chiffré" }
    ],
    flags: ["view", "edit", "rekey (changer le mot de passe)"]
  },
  {
    name: "ansible-pull",
    os: "ansible",
    category: "Système",
    description: "Exécute un playbook en mode pull : la machine cible récupère et applique elle-même la config depuis un dépôt Git.",
    syntax: "ansible-pull -U <dépôt_git> <playbook.yml>",
    examples: [
      { cmd: "ansible-pull -U https://git.nexa.local/infra.git site.yml", desc: "Récupère et applique la config depuis Git" }
    ],
    flags: ["-U (url du dépôt)", "-C (branche)"]
  },
  {
    name: "ansible-lint",
    os: "ansible",
    category: "Système",
    description: "Analyse statiquement un playbook pour détecter les erreurs de style et les mauvaises pratiques.",
    syntax: "ansible-lint <playbook.yml>",
    examples: [
      { cmd: "ansible-lint site.yml", desc: "Vérifie le playbook avant exécution" }
    ],
    flags: ["-x (exclure une règle)"]
  },
  {
    name: "ansible-playbook -v",
    os: "ansible",
    category: "Système",
    description: "Augmente le niveau de verbosité de l'exécution pour faciliter le débogage.",
    syntax: "ansible-playbook <playbook.yml> -v | -vv | -vvv",
    examples: [
      { cmd: "ansible-playbook site.yml -vvv", desc: "Verbosité maximale, affiche les détails de connexion" }
    ],
    flags: ["-v", "-vv", "-vvv", "-vvvv (connection debug)"]
  },
  {
    name: "ansible-galaxy collection install",
    os: "ansible",
    category: "Paquets",
    description: "Installe une collection Ansible (modules/plugins groupés, ex: community.general).",
    syntax: "ansible-galaxy collection install <namespace.collection>",
    examples: [
      { cmd: "ansible-galaxy collection install community.general", desc: "Installe une collection communautaire" },
      { cmd: "ansible-galaxy collection list", desc: "Liste les collections installées" }
    ],
    flags: ["-r (requirements.yml)", "list"]
  },
  {
    name: "ansible-playbook --syntax-check",
    os: "ansible",
    category: "Système",
    description: "Vérifie uniquement la syntaxe YAML d'un playbook sans l'exécuter.",
    syntax: "ansible-playbook <playbook.yml> --syntax-check",
    examples: [
      { cmd: "ansible-playbook site.yml --syntax-check", desc: "Valide la syntaxe avant de lancer" }
    ],
    flags: ["--syntax-check", "--list-tasks", "--list-hosts"]
  },

  // ── GIT ───────────────────────────────────────────────────
  {
    name: "git clone",
    os: "git",
    category: "Fichiers",
    description: "Clone un dépôt distant en local.",
    syntax: "git clone <url> [dossier]",
    examples: [
      { cmd: "git clone https://github.com/user/repo.git", desc: "Clone le dépôt" },
      { cmd: "git clone --depth 1 https://github.com/user/repo.git", desc: "Clone superficiel (historique minimal)" },
      { cmd: "git clone -b develop https://github.com/user/repo.git", desc: "Clone la branche develop" }
    ],
    flags: ["--depth n (historique limité)", "-b (branche)", "--bare", "--recursive"]
  },
  {
    name: "git commit",
    os: "git",
    category: "Fichiers",
    description: "Enregistre les modifications indexées dans l'historique.",
    syntax: "git commit [options]",
    examples: [
      { cmd: "git commit -m 'feat: ajout login'", desc: "Commit avec message" },
      { cmd: "git commit -am 'fix: correction bug'", desc: "Stage + commit en une commande" },
      { cmd: "git commit --amend --no-edit", desc: "Modifie le dernier commit sans changer le message" }
    ],
    flags: ["-m (message)", "-a (stage auto)", "--amend (modifier dernier commit)", "--no-edit"]
  },
  {
    name: "git status / log",
    os: "git",
    category: "Système",
    description: "Affiche l'état du dépôt ou l'historique des commits.",
    syntax: "git status | git log [options]",
    examples: [
      { cmd: "git status", desc: "Fichiers modifiés / indexés / non suivis" },
      { cmd: "git log --oneline --graph --all", desc: "Historique compact avec branches" },
      { cmd: "git log --author='Tom' --since='1 week ago'", desc: "Commits de Tom cette semaine" }
    ],
    flags: ["--oneline", "--graph", "--all", "--author", "--since / --until"]
  },
  {
    name: "git branch",
    os: "git",
    category: "Système",
    description: "Gère les branches du dépôt.",
    syntax: "git branch [options] [nom]",
    examples: [
      { cmd: "git branch", desc: "Liste les branches locales" },
      { cmd: "git branch -a", desc: "Toutes les branches (locales + distantes)" },
      { cmd: "git branch -d feature/login", desc: "Supprime la branche feature/login" }
    ],
    flags: ["-a (toutes)", "-d (supprimer)", "-D (forcer)", "-r (distantes)", "-m (renommer)"]
  },
  {
    name: "git stash",
    os: "git",
    category: "Fichiers",
    description: "Sauvegarde temporairement les modifications non commitées.",
    syntax: "git stash [action]",
    examples: [
      { cmd: "git stash", desc: "Met de côté les modifications en cours" },
      { cmd: "git stash pop", desc: "Restaure le dernier stash" },
      { cmd: "git stash list", desc: "Liste tous les stash" }
    ],
    flags: ["push / pop / list / drop / apply / clear"]
  },
  {
    name: "git rebase",
    os: "git",
    category: "Système",
    description: "Réapplique des commits sur une autre base.",
    syntax: "git rebase <branche>",
    examples: [
      { cmd: "git rebase main", desc: "Rebase la branche courante sur main" },
      { cmd: "git rebase -i HEAD~3", desc: "Rebase interactif sur les 3 derniers commits" },
      { cmd: "git rebase --abort", desc: "Annule un rebase en cours" }
    ],
    flags: ["-i (interactif)", "--abort", "--continue", "--skip"]
  },
  {
    name: "git push / git pull",
    os: "git",
    category: "Système",
    description: "Envoie les commits locaux vers un dépôt distant ou récupère les changements distants.",
    syntax: "git push <remote> <branche> ; git pull <remote> <branche>",
    examples: [
      { cmd: "git push origin main", desc: "Envoie la branche main vers origin" },
      { cmd: "git pull origin main", desc: "Récupère et fusionne les changements distants" },
      { cmd: "git push -u origin feature/login", desc: "Pousse et lie la branche distante" }
    ],
    flags: ["-u (set upstream)", "--force (forcer)", "--tags"]
  },
  {
    name: "git merge",
    os: "git",
    category: "Système",
    description: "Fusionne une branche dans la branche courante.",
    syntax: "git merge <branche>",
    examples: [
      { cmd: "git merge feature/login", desc: "Fusionne la branche feature/login dans la courante" },
      { cmd: "git merge --no-ff feature/login", desc: "Force un commit de merge même en fast-forward" },
      { cmd: "git merge --abort", desc: "Annule un merge en conflit" }
    ],
    flags: ["--no-ff", "--squash", "--abort"]
  },
  {
    name: "git diff",
    os: "git",
    category: "Système",
    description: "Affiche les différences entre fichiers, commits ou branches.",
    syntax: "git diff [options] [<commit1> <commit2>]",
    examples: [
      { cmd: "git diff", desc: "Différences non indexées" },
      { cmd: "git diff --staged", desc: "Différences déjà indexées (staged)" },
      { cmd: "git diff main feature/login", desc: "Compare deux branches" }
    ],
    flags: ["--staged", "--stat (résumé)", "--name-only"]
  },
  {
    name: "git reset",
    os: "git",
    category: "Système",
    description: "Annule des commits ou désindexe des fichiers, avec plusieurs niveaux de portée.",
    syntax: "git reset [--soft|--mixed|--hard] <commit>",
    examples: [
      { cmd: "git reset --soft HEAD~1", desc: "Annule le dernier commit, garde les modifications indexées" },
      { cmd: "git reset --hard HEAD~1", desc: "Annule le dernier commit et perd les modifications (attention)" },
      { cmd: "git reset fichier.txt", desc: "Désindexe un fichier sans toucher au contenu" }
    ],
    flags: ["--soft", "--mixed (défaut)", "--hard"]
  },
  {
    name: "git revert",
    os: "git",
    category: "Système",
    description: "Annule un commit en créant un nouveau commit inverse, sans réécrire l'historique.",
    syntax: "git revert <commit>",
    examples: [
      { cmd: "git revert HEAD", desc: "Annule le dernier commit proprement" },
      { cmd: "git revert abc123", desc: "Annule un commit spécifique par son hash" }
    ],
    flags: ["--no-commit (préparer sans valider)"]
  },
  {
    name: "git checkout / git switch",
    os: "git",
    category: "Système",
    description: "Change de branche ou restaure des fichiers à un état antérieur.",
    syntax: "git checkout <branche> | git switch <branche>",
    examples: [
      { cmd: "git switch feature/login", desc: "Bascule vers une branche existante" },
      { cmd: "git switch -c feature/new", desc: "Crée et bascule vers une nouvelle branche" },
      { cmd: "git checkout -- fichier.txt", desc: "Annule les modifications locales d'un fichier" }
    ],
    flags: ["-c (créer la branche)", "-- (restaurer un fichier)"]
  },
  {
    name: "git tag",
    os: "git",
    category: "Système",
    description: "Crée des tags pour marquer des points précis de l'historique (ex: versions).",
    syntax: "git tag <nom> [commit]",
    examples: [
      { cmd: "git tag v1.0.0", desc: "Crée un tag sur le commit courant" },
      { cmd: "git tag -a v1.0.0 -m \"Release 1.0\"", desc: "Crée un tag annoté avec message" },
      { cmd: "git push origin --tags", desc: "Pousse tous les tags vers le distant" }
    ],
    flags: ["-a (annoté)", "-d (supprimer)", "-l (lister)"]
  },
  {
    name: "git cherry-pick",
    os: "git",
    category: "Système",
    description: "Applique un commit précis d'une autre branche sur la branche courante.",
    syntax: "git cherry-pick <commit>",
    examples: [
      { cmd: "git cherry-pick abc123", desc: "Applique un commit spécifique" },
      { cmd: "git cherry-pick --abort", desc: "Annule un cherry-pick en conflit" }
    ],
    flags: ["--abort", "--continue", "-n (sans commit auto)"]
  },
  {
    name: "git remote",
    os: "git",
    category: "Système",
    description: "Gère les dépôts distants associés au dépôt local.",
    syntax: "git remote <action> [nom] [url]",
    examples: [
      { cmd: "git remote -v", desc: "Liste les remotes et leurs URL" },
      { cmd: "git remote add origin https://github.com/user/repo.git", desc: "Ajoute un remote" },
      { cmd: "git remote set-url origin <nouvelle_url>", desc: "Change l'URL d'un remote" }
    ],
    flags: ["-v (verbose)", "add", "remove", "set-url"]
  },
  {
    name: "git log",
    os: "git",
    category: "Système",
    description: "Affiche l'historique des commits avec différents niveaux de détail.",
    syntax: "git log [options]",
    examples: [
      { cmd: "git log --oneline --graph --all", desc: "Historique compact avec graphe des branches" },
      { cmd: "git log -p -2", desc: "Détail des 2 derniers commits avec diff" },
      { cmd: "git log --author=\"Tom\"", desc: "Filtre par auteur" }
    ],
    flags: ["--oneline", "--graph", "--all", "-p (patch)", "--author"]
  },
  {
    name: "git fetch",
    os: "git",
    category: "Système",
    description: "Récupère les changements distants sans les fusionner (contrairement à pull).",
    syntax: "git fetch [remote]",
    examples: [
      { cmd: "git fetch origin", desc: "Récupère les nouveautés sans fusionner" },
      { cmd: "git fetch --all", desc: "Récupère depuis tous les remotes configurés" }
    ],
    flags: ["--all", "--prune (nettoyer les branches supprimées)"]
  },
  {
    name: "git blame",
    os: "git",
    category: "Système",
    description: "Affiche qui a modifié chaque ligne d'un fichier et dans quel commit.",
    syntax: "git blame <fichier>",
    examples: [
      { cmd: "git blame index.js", desc: "Affiche l'auteur de chaque ligne" },
      { cmd: "git blame -L 10,20 index.js", desc: "Limite l'affichage à un intervalle de lignes" }
    ],
    flags: ["-L (limiter les lignes)"]
  },
  {
    name: "git config",
    os: "git",
    category: "Système",
    description: "Configure les paramètres Git (identité, alias, comportements par défaut).",
    syntax: "git config [--global] <clé> <valeur>",
    examples: [
      { cmd: "git config --global user.name \"Tom\"", desc: "Définit le nom d'auteur global" },
      { cmd: "git config --global user.email \"tom@example.com\"", desc: "Définit l'email global" },
      { cmd: "git config --global alias.st status", desc: "Crée un alias (git st = git status)" }
    ],
    flags: ["--global", "--local", "--list"]
  },
  {
    name: "git gitignore",
    os: "git",
    category: "Fichiers",
    description: "Référence rapide pour exclure des fichiers/dossiers du suivi Git via .gitignore.",
    syntax: "echo '<motif>' >> .gitignore",
    examples: [
      { cmd: "echo 'node_modules/' >> .gitignore", desc: "Exclut un dossier" },
      { cmd: "echo '*.log' >> .gitignore", desc: "Exclut tous les fichiers .log" },
      { cmd: "git rm -r --cached node_modules", desc: "Retire du suivi un dossier déjà tracké" }
    ],
    flags: []
  },

  // ── KUBECTL ───────────────────────────────────────────────
  {
    name: "kubectl get",
    os: "kubectl",
    category: "Conteneurs",
    description: "Affiche les ressources Kubernetes (pods, services, deployments...).",
    syntax: "kubectl get <ressource> [options]",
    examples: [
      { cmd: "kubectl get pods", desc: "Liste les pods du namespace courant" },
      { cmd: "kubectl get pods -A", desc: "Pods de tous les namespaces" },
      { cmd: "kubectl get all -n production", desc: "Toutes les ressources du namespace production" }
    ],
    flags: ["-n (namespace)", "-A (tous namespaces)", "-o wide / yaml / json", "--watch (-w)"]
  },
  {
    name: "kubectl apply",
    os: "kubectl",
    category: "Conteneurs",
    description: "Applique une configuration depuis un fichier YAML/JSON.",
    syntax: "kubectl apply -f <fichier.yaml>",
    examples: [
      { cmd: "kubectl apply -f deployment.yaml", desc: "Applique un déploiement" },
      { cmd: "kubectl apply -f ./k8s/", desc: "Applique tous les fichiers du dossier k8s" },
      { cmd: "kubectl apply -k ./overlays/prod", desc: "Applique avec Kustomize" }
    ],
    flags: ["-f (fichier)", "-k (kustomize)", "--dry-run=client (simulation)", "--record"]
  },
  {
    name: "kubectl logs",
    os: "kubectl",
    category: "Conteneurs",
    description: "Affiche les logs d'un pod ou conteneur.",
    syntax: "kubectl logs <pod> [options]",
    examples: [
      { cmd: "kubectl logs mon-pod", desc: "Logs du pod" },
      { cmd: "kubectl logs -f mon-pod -c mon-conteneur", desc: "Suit les logs d'un conteneur spécifique" },
      { cmd: "kubectl logs --previous mon-pod", desc: "Logs du conteneur précédent (crash)" }
    ],
    flags: ["-f (follow)", "-c (conteneur)", "--previous", "--tail n", "--since"]
  },
  {
    name: "kubectl exec",
    os: "kubectl",
    category: "Conteneurs",
    description: "Exécute une commande dans un pod.",
    syntax: "kubectl exec -it <pod> -- <commande>",
    examples: [
      { cmd: "kubectl exec -it mon-pod -- bash", desc: "Shell interactif dans le pod" },
      { cmd: "kubectl exec mon-pod -- env", desc: "Affiche les variables d'environnement" },
      { cmd: "kubectl exec -it mon-pod -c nginx -- nginx -t", desc: "Test config nginx dans le conteneur" }
    ],
    flags: ["-i (interactif)", "-t (TTY)", "-c (conteneur)", "-n (namespace)"]
  },
  {
    name: "kubectl describe",
    os: "kubectl",
    category: "Conteneurs",
    description: "Affiche les détails complets d'une ressource Kubernetes.",
    syntax: "kubectl describe <ressource> <nom>",
    examples: [
      { cmd: "kubectl describe pod mon-pod", desc: "Détails du pod (events, état...)" },
      { cmd: "kubectl describe node worker-1", desc: "Infos du nœud worker-1" },
      { cmd: "kubectl describe svc mon-service -n prod", desc: "Détails du service en prod" }
    ],
    flags: ["-n (namespace)", "--show-events=false"]
  },
  {
    name: "kubectl delete",
    os: "kubectl",
    category: "Conteneurs",
    description: "Supprime des ressources Kubernetes.",
    syntax: "kubectl delete <ressource> <nom>",
    examples: [
      { cmd: "kubectl delete pod mon-pod", desc: "Supprime le pod" },
      { cmd: "kubectl delete -f deployment.yaml", desc: "Supprime ce qui est défini dans le YAML" },
      { cmd: "kubectl delete pod --all -n staging", desc: "Supprime tous les pods du namespace staging" }
    ],
    flags: ["-f (fichier)", "--all", "--grace-period=0 --force (immédiat)", "-n (namespace)"]
  },
  {
    name: "kubectl create deployment",
    os: "kubectl",
    category: "Conteneurs",
    description: "Crée rapidement un déploiement à partir d'une image, sans fichier YAML.",
    syntax: "kubectl create deployment <nom> --image=<image>",
    examples: [
      { cmd: "kubectl create deployment web --image=nginx", desc: "Crée un déploiement nginx" },
      { cmd: "kubectl create deployment web --image=nginx --replicas=3", desc: "Crée avec 3 réplicas d'emblée" }
    ],
    flags: ["--image", "--replicas", "--port"]
  },
  {
    name: "kubectl scale",
    os: "kubectl",
    category: "Conteneurs",
    description: "Modifie le nombre de réplicas d'un déploiement existant.",
    syntax: "kubectl scale deployment <nom> --replicas=<n>",
    examples: [
      { cmd: "kubectl scale deployment web --replicas=5", desc: "Passe à 5 réplicas" },
      { cmd: "kubectl scale deployment web --replicas=0", desc: "Stoppe le déploiement sans le supprimer" }
    ],
    flags: ["--replicas", "-n (namespace)"]
  },
  {
    name: "kubectl rollout",
    os: "kubectl",
    category: "Conteneurs",
    description: "Gère le déploiement progressif et l'historique des versions d'un déploiement.",
    syntax: "kubectl rollout <action> deployment/<nom>",
    examples: [
      { cmd: "kubectl rollout status deployment/web", desc: "Suit l'état du déploiement en cours" },
      { cmd: "kubectl rollout undo deployment/web", desc: "Revient à la version précédente" },
      { cmd: "kubectl rollout history deployment/web", desc: "Affiche l'historique des versions" }
    ],
    flags: ["status", "undo", "history", "restart"]
  },
  {
    name: "kubectl port-forward",
    os: "kubectl",
    category: "Conteneurs",
    description: "Redirige un port local vers un pod ou service, utile pour debug sans exposer publiquement.",
    syntax: "kubectl port-forward <pod|svc>/<nom> <port_local>:<port_distant>",
    examples: [
      { cmd: "kubectl port-forward pod/mon-pod 8080:80", desc: "Accède au pod via localhost:8080" },
      { cmd: "kubectl port-forward svc/mon-service 5432:5432", desc: "Redirige vers un service (ex: base de données)" }
    ],
    flags: ["-n (namespace)"]
  },
  {
    name: "kubectl get nodes",
    os: "kubectl",
    category: "Conteneurs",
    description: "Liste les nœuds du cluster et leur état.",
    syntax: "kubectl get nodes [-o wide]",
    examples: [
      { cmd: "kubectl get nodes", desc: "Liste les nœuds et leur statut" },
      { cmd: "kubectl get nodes -o wide", desc: "Affiche aussi l'IP et la version du kubelet" }
    ],
    flags: ["-o wide", "--show-labels"]
  },
  {
    name: "kubectl top",
    os: "kubectl",
    category: "Conteneurs",
    description: "Affiche l'utilisation CPU/RAM des nœuds ou pods (nécessite metrics-server).",
    syntax: "kubectl top nodes | kubectl top pods",
    examples: [
      { cmd: "kubectl top nodes", desc: "Charge CPU/RAM par nœud" },
      { cmd: "kubectl top pods -n prod", desc: "Consommation des pods d'un namespace" }
    ],
    flags: ["-n (namespace)", "--sort-by"]
  },
  {
    name: "kubectl get namespace / kubectl create namespace",
    os: "kubectl",
    category: "Conteneurs",
    description: "Liste ou crée des namespaces, l'unité d'isolation logique de Kubernetes.",
    syntax: "kubectl get namespace | kubectl create namespace <nom>",
    examples: [
      { cmd: "kubectl get namespace", desc: "Liste tous les namespaces" },
      { cmd: "kubectl create namespace staging", desc: "Crée un namespace staging" }
    ],
    flags: []
  },
  {
    name: "kubectl config",
    os: "kubectl",
    category: "Système",
    description: "Gère les contextes kubeconfig pour basculer entre plusieurs clusters.",
    syntax: "kubectl config <action>",
    examples: [
      { cmd: "kubectl config get-contexts", desc: "Liste les contextes disponibles" },
      { cmd: "kubectl config use-context prod-cluster", desc: "Bascule vers un autre cluster" },
      { cmd: "kubectl config current-context", desc: "Affiche le contexte actif" }
    ],
    flags: ["get-contexts", "use-context", "current-context"]
  },
  {
    name: "kubectl apply -k (kustomize)",
    os: "kubectl",
    category: "Conteneurs",
    description: "Applique une configuration via Kustomize, pour personnaliser des manifests sans les dupliquer.",
    syntax: "kubectl apply -k <dossier>",
    examples: [
      { cmd: "kubectl apply -k overlays/prod", desc: "Applique l'overlay de production" }
    ],
    flags: ["-k (kustomize)"]
  },
  {
    name: "kubectl cp",
    os: "kubectl",
    category: "Conteneurs",
    description: "Copie des fichiers entre la machine locale et un pod.",
    syntax: "kubectl cp <source> <pod>:<destination>",
    examples: [
      { cmd: "kubectl cp ./config.yml mon-pod:/etc/app/config.yml", desc: "Copie un fichier vers le pod" },
      { cmd: "kubectl cp mon-pod:/var/log/app.log ./app.log", desc: "Copie un fichier depuis le pod" }
    ],
    flags: ["-c (conteneur)", "-n (namespace)"]
  },
  {
    name: "kubectl edit",
    os: "kubectl",
    category: "Conteneurs",
    description: "Édite directement une ressource Kubernetes en YAML via l'éditeur par défaut.",
    syntax: "kubectl edit <ressource> <nom>",
    examples: [
      { cmd: "kubectl edit deployment web", desc: "Ouvre le déploiement dans l'éditeur (modifie en direct)" },
      { cmd: "kubectl edit cm mon-configmap", desc: "Édite une ConfigMap" }
    ],
    flags: ["-n (namespace)"]
  },
  {
    name: "kubectl create secret",
    os: "kubectl",
    category: "Conteneurs",
    description: "Crée un secret Kubernetes pour stocker des informations sensibles (mots de passe, clés).",
    syntax: "kubectl create secret generic <nom> --from-literal=<clé>=<valeur>",
    examples: [
      { cmd: "kubectl create secret generic db-pass --from-literal=password=S3cret!", desc: "Crée un secret simple" },
      { cmd: "kubectl create secret generic tls-cert --from-file=tls.crt --from-file=tls.key", desc: "Crée un secret depuis des fichiers" }
    ],
    flags: ["--from-literal", "--from-file", "--type"]
  },
  {
    name: "kubectl get events",
    os: "kubectl",
    category: "Conteneurs",
    description: "Affiche les événements récents du cluster, utile pour diagnostiquer un pod en erreur.",
    syntax: "kubectl get events [--sort-by=<champ>]",
    examples: [
      { cmd: "kubectl get events --sort-by='.lastTimestamp'", desc: "Événements triés du plus récent" },
      { cmd: "kubectl get events -n prod", desc: "Événements d'un namespace précis" }
    ],
    flags: ["--sort-by", "-n (namespace)", "--watch"]
  },

  // ── WINDOWS SERVER ────────────────────────────────────────
  {
    name: "Get-ADUser",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Recherche et affiche les informations d'un ou plusieurs utilisateurs Active Directory.",
    syntax: "Get-ADUser -Identity <user> | -Filter {...}",
    examples: [
      { cmd: "Get-ADUser -Identity tom.marcorelli", desc: "Affiche l'utilisateur tom.marcorelli" },
      { cmd: "Get-ADUser -Filter * -Properties Email | Select Name,Email", desc: "Liste tous les users avec leur email" },
      { cmd: "Get-ADUser -Filter {Enabled -eq \\$false}", desc: "Liste les comptes désactivés" }
    ],
    flags: ["-Identity", "-Filter", "-Properties", "-SearchBase (OU ciblée)"]
  },
  {
    name: "New-ADUser",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Crée un nouvel utilisateur dans Active Directory.",
    syntax: "New-ADUser -Name <nom> [options]",
    examples: [
      { cmd: "New-ADUser -Name \"Tom Marcorelli\" -SamAccountName tom.m -Enabled \\$true", desc: "Crée un compte activé" },
      { cmd: "New-ADUser -Name jdupont -Path \"OU=Stagiaires,DC=sisr,DC=local\"", desc: "Crée dans une OU précise" }
    ],
    flags: ["-SamAccountName", "-Path (OU cible)", "-Enabled", "-AccountPassword"]
  },
  {
    name: "Get-ADGroup / Add-ADGroupMember",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Gère les groupes Active Directory et leurs membres.",
    syntax: "Add-ADGroupMember -Identity <groupe> -Members <user>",
    examples: [
      { cmd: "Get-ADGroup -Filter \"Name -like 'Admins*'\"", desc: "Cherche les groupes commençant par Admins" },
      { cmd: "Add-ADGroupMember -Identity \"IT-Support\" -Members tom.m", desc: "Ajoute tom.m au groupe IT-Support" },
      { cmd: "Get-ADGroupMember -Identity \"IT-Support\"", desc: "Liste les membres du groupe" }
    ],
    flags: ["-Identity", "-Members", "-Filter"]
  },
  {
    name: "dsquery",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Recherche des objets Active Directory en ligne de commande (CMD, legacy mais toujours utilisé).",
    syntax: "dsquery <type> [filtre]",
    examples: [
      { cmd: "dsquery user -name \"tom*\"", desc: "Cherche les utilisateurs commençant par tom" },
      { cmd: "dsquery computer -inactive 4", desc: "Ordinateurs inactifs depuis 4 semaines" },
      { cmd: "dsquery group -name \"Admins*\"", desc: "Cherche des groupes par nom" }
    ],
    flags: ["user / computer / group / ou / contact"]
  },
  {
    name: "gpupdate",
    os: "windows-server",
    category: "Système",
    description: "Force l'application immédiate des stratégies de groupe (GPO) sur la machine.",
    syntax: "gpupdate [/force]",
    examples: [
      { cmd: "gpupdate /force", desc: "Force l'application complète des GPO" },
      { cmd: "gpupdate /target:computer", desc: "Applique uniquement les GPO ordinateur" },
      { cmd: "gpresult /r", desc: "Affiche les GPO actuellement appliquées" }
    ],
    flags: ["/force", "/target:user|computer", "/logoff", "/boot"]
  },
  {
    name: "Install-WindowsFeature",
    os: "windows-server",
    category: "Paquets",
    description: "Installe un rôle ou une fonctionnalité Windows Server (AD DS, DNS, DHCP, IIS...).",
    syntax: "Install-WindowsFeature -Name <rôle> [-IncludeManagementTools]",
    examples: [
      { cmd: "Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools", desc: "Installe le rôle AD DS" },
      { cmd: "Install-WindowsFeature -Name DNS -IncludeManagementTools", desc: "Installe le rôle DNS" },
      { cmd: "Install-WindowsFeature -Name DHCP -IncludeManagementTools", desc: "Installe le rôle DHCP" }
    ],
    flags: ["-IncludeManagementTools", "-Restart", "-Source"]
  },
  {
    name: "Get-WindowsFeature",
    os: "windows-server",
    category: "Système",
    description: "Liste les rôles et fonctionnalités disponibles ou installés sur le serveur.",
    syntax: "Get-WindowsFeature [-Name <rôle>]",
    examples: [
      { cmd: "Get-WindowsFeature", desc: "Liste tous les rôles/fonctionnalités" },
      { cmd: "Get-WindowsFeature | Where-Object {$_.Installed}", desc: "Uniquement les rôles installés" },
      { cmd: "Get-WindowsFeature -Name DNS", desc: "Vérifie l'état du rôle DNS" }
    ],
    flags: ["-Name", "-ComputerName", "-Credential"]
  },
  {
    name: "Add-DnsServerPrimaryZone",
    os: "windows-server",
    category: "Réseau",
    description: "Crée une zone DNS primaire sur un serveur DNS Windows.",
    syntax: "Add-DnsServerPrimaryZone -Name <zone> -ZoneFile <fichier>",
    examples: [
      { cmd: "Add-DnsServerPrimaryZone -Name \"nexa.local\" -ZoneFile \"nexa.local.dns\"", desc: "Crée une zone directe" },
      { cmd: "Add-DnsServerPrimaryZone -NetworkID \"192.168.1.0/24\" -ReplicationScope Forest", desc: "Crée une zone de résolution inverse" }
    ],
    flags: ["-ZoneFile", "-DynamicUpdate", "-ReplicationScope"]
  },
  {
    name: "Add-DhcpServerv4Scope",
    os: "windows-server",
    category: "Réseau",
    description: "Crée une étendue DHCP IPv4 sur un serveur DHCP Windows.",
    syntax: "Add-DhcpServerv4Scope -Name <nom> -StartRange <ip> -EndRange <ip> -SubnetMask <masque>",
    examples: [
      { cmd: "Add-DhcpServerv4Scope -Name \"LAN-Ventes\" -StartRange 192.168.1.100 -EndRange 192.168.1.200 -SubnetMask 255.255.255.0", desc: "Crée une étendue DHCP" },
      { cmd: "Get-DhcpServerv4Scope", desc: "Liste les étendues existantes" }
    ],
    flags: ["-StartRange", "-EndRange", "-SubnetMask", "-LeaseDuration"]
  },
  {
    name: "New-GPO",
    os: "windows-server",
    category: "Système",
    description: "Crée et lie une nouvelle stratégie de groupe (GPO) à une unité d'organisation.",
    syntax: "New-GPO -Name <nom> | New-GPLink -Target <OU>",
    examples: [
      { cmd: "New-GPO -Name \"Restriction-USB\"", desc: "Crée une nouvelle GPO vide" },
      { cmd: "New-GPO -Name \"Restriction-USB\" | New-GPLink -Target \"OU=Ventes,DC=nexa,DC=local\"", desc: "Crée et lie la GPO à une OU" }
    ],
    flags: ["-Comment", "-StarterGPOName", "-Domain"]
  },
  {
    name: "New-Website",
    os: "windows-server",
    category: "Services",
    description: "Crée un nouveau site web dans IIS (Internet Information Services).",
    syntax: "New-Website -Name <nom> -PhysicalPath <chemin> -Port <port>",
    examples: [
      { cmd: "New-Website -Name \"IntranetRH\" -PhysicalPath \"C:\\inetpub\\rh\" -Port 8080", desc: "Crée un site IIS sur le port 8080" },
      { cmd: "Get-Website", desc: "Liste tous les sites IIS configurés" }
    ],
    flags: ["-PhysicalPath", "-Port", "-HostHeader", "-ApplicationPool"]
  },
  {
    name: "New-WebAppPool",
    os: "windows-server",
    category: "Services",
    description: "Crée et gère un pool d'applications IIS (isolation des sites web).",
    syntax: "New-WebAppPool -Name <nom>",
    examples: [
      { cmd: "New-WebAppPool -Name \"PoolRH\"", desc: "Crée un pool d'applications dédié" },
      { cmd: "Restart-WebAppPool -Name \"PoolRH\"", desc: "Redémarre le pool après une mise à jour" }
    ],
    flags: ["-Name", "-managedRuntimeVersion"]
  },
  {
    name: "New-VM",
    os: "windows-server",
    category: "Système",
    description: "Crée une nouvelle machine virtuelle sous le rôle Hyper-V.",
    syntax: "New-VM -Name <nom> -MemoryStartupBytes <RAM> -NewVHDPath <chemin> -NewVHDSizeBytes <taille>",
    examples: [
      { cmd: "New-VM -Name \"VM-WebServer\" -MemoryStartupBytes 4GB -NewVHDPath \"D:\\VMs\\web.vhdx\" -NewVHDSizeBytes 60GB", desc: "Crée une VM avec un disque dédié" }
    ],
    flags: ["-MemoryStartupBytes", "-NewVHDPath", "-SwitchName", "-Generation"]
  },
  {
    name: "Get-VM / Start-VM",
    os: "windows-server",
    category: "Système",
    description: "Liste, démarre ou gère l'état des machines virtuelles Hyper-V.",
    syntax: "Get-VM [-Name <nom>] | Start-VM -Name <nom>",
    examples: [
      { cmd: "Get-VM", desc: "Liste toutes les VMs et leur état" },
      { cmd: "Start-VM -Name \"VM-WebServer\"", desc: "Démarre une VM" },
      { cmd: "Checkpoint-VM -Name \"VM-WebServer\" -SnapshotName \"Avant-MAJ\"", desc: "Crée un point de contrôle (snapshot)" }
    ],
    flags: ["-Name", "-ComputerName", "-State"]
  },
  {
    name: "New-SmbShare",
    os: "windows-server",
    category: "Fichiers",
    description: "Crée un partage réseau SMB avec des droits d'accès définis.",
    syntax: "New-SmbShare -Name <partage> -Path <chemin> -FullAccess <groupe>",
    examples: [
      { cmd: "New-SmbShare -Name \"Compta\" -Path \"D:\\Partages\\Compta\" -FullAccess \"NEXA\\Comptables\"", desc: "Crée un partage avec accès complet pour un groupe" },
      { cmd: "Get-SmbShare", desc: "Liste les partages existants" }
    ],
    flags: ["-FullAccess", "-ReadAccess", "-ChangeAccess", "-CachingMode"]
  },
  {
    name: "New-DfsnRoot / New-DfsnFolder",
    os: "windows-server",
    category: "Fichiers",
    description: "Crée un espace de noms DFS (Distributed File System) pour unifier des partages.",
    syntax: "New-DfsnRoot -TargetPath <chemin> -Type <type> -Path <namespace>",
    examples: [
      { cmd: "New-DfsnRoot -TargetPath \"\\\\SRV1\\Partages\" -Type DomainV2 -Path \"\\\\nexa.local\\Data\"", desc: "Crée une racine DFS" },
      { cmd: "New-DfsnFolder -Path \"\\\\nexa.local\\Data\\RH\" -TargetPath \"\\\\SRV2\\RH\"", desc: "Ajoute un dossier DFS lié à un serveur cible" }
    ],
    flags: ["-Type", "-TargetPath", "-EnableSiteCosting"]
  },
  {
    name: "wbadmin",
    os: "windows-server",
    category: "Archives",
    description: "Sauvegarde et restaure le système via Windows Server Backup (CLI).",
    syntax: "wbadmin <commande> [options]",
    examples: [
      { cmd: "wbadmin start backup -backupTarget:D: -include:C:", desc: "Lance une sauvegarde complète vers le disque D:" },
      { cmd: "wbadmin get versions", desc: "Liste les sauvegardes disponibles" }
    ],
    flags: ["start backup", "get versions", "start systemstaterecovery"]
  },
  {
    name: "Get-WsusUpdate / Invoke-WsusServerCleanup",
    os: "windows-server",
    category: "Système",
    description: "Gère les mises à jour approuvées et nettoie le serveur WSUS.",
    syntax: "Get-WsusUpdate -Approval <état> | Invoke-WsusServerCleanup",
    examples: [
      { cmd: "Get-WsusUpdate -Approval Unapproved", desc: "Liste les mises à jour en attente d'approbation" },
      { cmd: "Invoke-WsusServerCleanup -CleanupObsoleteUpdates -CleanupUnneededContentFiles", desc: "Nettoie le serveur WSUS" }
    ],
    flags: ["-Approval", "-CleanupObsoleteUpdates", "-CleanupUnneededContentFiles"]
  },
  {
    name: "Add-Printer / Add-PrinterDriver",
    os: "windows-server",
    category: "Services",
    description: "Installe un pilote et partage une imprimante réseau via le rôle Print Server.",
    syntax: "Add-PrinterDriver -Name <pilote> ; Add-Printer -Name <nom> -DriverName <pilote> -PortName <port>",
    examples: [
      { cmd: "Add-PrinterDriver -Name \"HP Universal Printing PCL6\"", desc: "Installe un pilote d'imprimante" },
      { cmd: "Add-Printer -Name \"Imprimante-RH\" -DriverName \"HP Universal Printing PCL6\" -PortName \"IP_192.168.1.50\"", desc: "Partage une imprimante réseau" }
    ],
    flags: ["-DriverName", "-PortName", "-Shared"]
  },
  {
    name: "New-RDSessionCollection",
    os: "windows-server",
    category: "Services",
    description: "Crée une collection de sessions Bureau à distance (RDS).",
    syntax: "New-RDSessionCollection -CollectionName <nom> -SessionHost <serveur> -CollectionDescription <desc>",
    examples: [
      { cmd: "New-RDSessionCollection -CollectionName \"Bureaux-Compta\" -SessionHost \"RDSH1.nexa.local\" -CollectionDescription \"Postes virtuels comptabilité\"", desc: "Crée une collection RDS" }
    ],
    flags: ["-SessionHost", "-CollectionDescription"]
  },
  {
    name: "New-ADOrganizationalUnit",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Crée une unité d'organisation (OU) dans Active Directory pour structurer l'annuaire.",
    syntax: "New-ADOrganizationalUnit -Name <nom> -Path <DN>",
    examples: [
      { cmd: "New-ADOrganizationalUnit -Name \"Ventes\" -Path \"DC=nexa,DC=local\"", desc: "Crée une OU à la racine du domaine" },
      { cmd: "Get-ADOrganizationalUnit -Filter *", desc: "Liste toutes les OU existantes" }
    ],
    flags: ["-Path", "-ProtectedFromAccidentalDeletion"]
  },
  {
    name: "Disable-ADAccount / Set-ADAccountPassword",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Désactive un compte ou réinitialise le mot de passe d'un utilisateur Active Directory.",
    syntax: "Disable-ADAccount -Identity <user> | Set-ADAccountPassword -Identity <user> -NewPassword <securestring>",
    examples: [
      { cmd: "Disable-ADAccount -Identity jdupont", desc: "Désactive le compte de jdupont" },
      { cmd: "Set-ADAccountPassword -Identity jdupont -Reset -NewPassword (ConvertTo-SecureString \"P@ssw0rd!\" -AsPlainText -Force)", desc: "Réinitialise le mot de passe" }
    ],
    flags: ["-Identity", "-Reset", "-NewPassword"]
  }
];


