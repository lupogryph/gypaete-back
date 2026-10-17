# 1. Utilisation d'une image Node.js ultra-légère
FROM node:22-alpine

# 2. Définition du dossier de travail dans le conteneur
WORKDIR /app

# 3. Copie explicite de vos deux fichiers demandés
COPY ./dist/gypaete-back.js ./

# 4. Commande exécutée au démarrage du conteneur
CMD ["node", "gypaete-back.js"]
