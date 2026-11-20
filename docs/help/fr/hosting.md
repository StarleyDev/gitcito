---
title: Hébergement et pull requests
category: Synchronisation et multi-dépôts
order: 56
summary: Créer des pull requests partout ; les relire et les fusionner sur GitHub et GitLab.
keywords: pull request PR merge request GitHub GitLab Bitbucket Azure DevOps revue review approuver approve fusionner merge tickets issues
---

# Hébergement et pull requests

## Créer

Créez une pull request (ou merge request) sans quitter l'application : listes
déroulantes de branches, titre et corps préremplis depuis les commits de la
branche, une bascule brouillon, et — sur GitHub — relecteurs, étiquettes et
assignés appliqués à la création.

![Création d'une pull request](../../screenshots/create-pr.webp)

Fonctionne sur **GitHub, GitLab, Bitbucket et Azure DevOps**. Les PR/MR ouvertes
des quatre sont listées dans la barre latérale.

Démarrez-en une depuis la comparaison de branches, depuis le graphe, depuis le
`+` du panneau PR, ou depuis un ticket (ce qui remplit `Closes #N`).

## Les piles dans la liste

Les pull requests posées les unes sur les autres se replient en une seule ligne
avec une icône de pile, la branche sur laquelle la chaîne atterrit et leur
nombre. Dépliez-la pour voir la chaîne dans l’ordre de lecture — de la feuille
vers la base — avec une petite flèche sous chacune nommant ce dans quoi elle
fusionne : le sens est à l’écran, pas à déduire de quatre branches de base.

Deux choses forment ce groupe : le numéro de pile de GitHub, quand les PR
appartiennent à une [pile native](stacks.md), et sinon les refs elles-mêmes —
une pull request dont la base est la tête d’une autre repose sur elle. Cette
seconde règle est ce qui fait que cela marche aussi sur GitLab, Bitbucket et
Azure DevOps, et pour des chaînes ouvertes avant tout cela.

![Une pile dans la liste des pull requests](../../screenshots/pr-stack-list.webp)

Chaque ligne porte l’état des **vérifications** de sa tête — survolez pour les
comptes — et, sur GitHub, les niveaux déjà fermés ou fusionnés, qu’une liste de
PR ouvertes masquerait. Un niveau au-dessus d’un niveau **fermé** est marqué
bloqué : ses vérifications peuvent être vertes, mais la branche qu’il vise
n’atterrira jamais. Les actions de la ligne apparaissent au survol, pour que le
titre garde la largeur.

Lire les vérifications coûte une requête par pull request, et seulement au
rafraîchissement de la liste.

## Vos pull requests sur le dépôt parent d’un fork

Dans un fork, les pull requests qui comptent sont souvent celles que vous avez
ouvertes sur le dépôt d’origine, et elles vivent là-bas, pas sur votre fork.
Ainsi, quand un dépôt a un remote `upstream` pointant vers un autre dépôt GitHub
qu’`origin`, la liste demande aussi à `upstream` ses pull requests ouvertes et ne
garde **que celles dont la branche vient de votre fork**. Elles apparaissent sous
celles de votre fork, sous un intitulé nommant le parent, **Sur owner/repo**. Un
clic ouvre la même vue détaillée, avec ses checks et sa revue, sur le parent.

![La pull request propre au fork, puis ses pull requests sur le parent sous On example/pr-ready-branch](../../screenshots/fork-upstream-prs.webp)

*Limites :* GitHub seulement, et seulement un remote nommé `upstream`. Les autres
pull requests du parent sont volontairement exclues : c’est sa file d’attente,
pas votre travail. Les piles et les recherches de branches n’agissent toujours
que sur la liste d’`origin`. Interroger le parent coûte une requête de plus par
actualisation.

## Relire — GitHub et GitLab

| | |
|---|---|
| **Conversation** | Commentaires et état de la revue |
| **Vérifications** | Les exécutions de CI (GitHub) ou les jobs de pipeline (GitLab) avec succès/échec/en attente et des liens vers les journaux |
| **Fichiers vus** | Une liste à cocher ✓ par fichier, avec progression |
| **Fils en ligne** | Commentaires de ligne groupés par `file:line`, et les réponses |
| **Actions** | Commenter, approuver, demander des changements, et merge / squash |

Si quelqu'un pousse en force en pleine revue, [ce qui a changé
depuis](range-diff.md) vous montre exactement ce qui a bougé.

Les différences GitLab, dites clairement : GitLab n'a pas d'appel unique
« envoyer la revue », donc **approuver** utilise son point d'accès
d'approbation et **demander des changements** retire votre approbation et
publie votre commentaire. Le **rebase-merge** n'est pas proposé — GitLab
choisit entre merge-commit et fast-forward selon les réglages du projet, le
menu de merge n'affiche donc que merge et squash. Les fils en ligne montrent le
fichier et la ligne, mais pas la section de diff environnante, que l'API de
GitLab ne renvoie pas. La revue et la fusion fonctionnent pour les projets sur
**gitlab.com** ; les instances auto-hébergées ne sont pas encore prises en
charge. Bitbucket et Azure DevOps s'ouvrent toujours dans le navigateur pour la
revue.

## GitLab auto-hébergé

Un GitLab d’entreprise a sa propre adresse. Indiquez-la à un profil dans
**Réglages → Intégrations → GitLab → Adresse GitLab**, par exemple
`git.example.org`, ou `https://example.net/gitlab` s’il est servi sous un chemin.
Dès lors, les remotes de cet hôte sont GitLab : les merge requests se listent,
s’ouvrent, se relisent et se fusionnent, le navigateur de clonage et *Créer un
dépôt* s’adressent à lui, et push et fetch s’authentifient avec le jeton de ce
profil.

**Un jeton GitLab appartient à une seule instance.** Le jeton d’un profil n’est
envoyé qu’à l’adresse que ce profil indique. Une adresse vide signifie
gitlab.com. Un jeton gitlab.com n’atteint jamais le serveur de l’entreprise, et un
jeton d’entreprise n’atteint jamais gitlab.com. Si les comptes professionnel et
personnel sont sur des instances différentes, donnez à chacun son profil. Un
dépôt lié à un profil utilise l’instance de ce profil.

**Créer un jeton** ouvre la page des jetons de votre instance avec `api` et
`write_repository` présélectionnés. Un jeton en lecture seule se connecte sans
souci, puis échoue au premier push.

Limites :

- **https uniquement.** Une adresse `http://` est refusée, car le jeton
  traverserait le réseau en clair.
- **Une instance GitLab par profil.** Ajoutez un second profil pour une seconde
  instance.
- En ssh, c’est l’hôte qui est comparé, pas le chemin : deux instances sur un
  même hôte sous des chemins différents ne se distinguent pas pour un remote ssh.
- Les avatars de remotes ne s’affichent que pour gitlab.com et github.com. Un
  remote auto-hébergé reçoit l’icône simple, pour que les noms de ses groupes ne
  partent jamais vers un hôte public.

## Forgejo

Définissez l’adresse de l’instance avant de saisir son jeton. Changer l’adresse efface la connexion précédente.

![Réglages de l’intégration Forgejo](../../screenshots/forgejo-integration.webp)

Forgejo — et Gitea, qui partage son API — tourne toujours à une adresse choisie
par son propriétaire : votre propre serveur, ou un serveur public comme
codeberg.org. Indiquez cette adresse à un profil dans **Réglages → Intégrations →
Forgejo**, avec un jeton d’accès. **Créer un jeton** ouvre la page des jetons de ce
serveur. Donnez au jeton les droits de lecture et d’écriture sur *repository*, et
de lecture sur *user* et *organization*.

Dès lors, les remotes de ce serveur sont Forgejo :

| Fonctionne | Comment |
|------------|---------|
| Push et fetch | Authentifiés avec le jeton du profil |
| Pull requests ouvertes | Listées dans la barre latérale, et ouvertes dans la [page de la pull request](#relire--github-et-gitlab) : conversation, diff de chaque fichier, checks (statuts de commit, Forgejo Actions compris), commenter, approuver, demander des changements, et merge / squash / rebase |
| Créer une pull request | Depuis l’app ; un brouillon reçoit le préfixe `WIP:` qu’utilise Forgejo |
| Navigateur de clonage, créer un dépôt | Sur ce serveur, sous votre compte ou une organisation |

Comme pour GitLab, **un jeton Forgejo ne va qu’au serveur qui l’a émis**. Un
profil sans adresse Forgejo n’a aucune identité Forgejo. Il n’y a pas de serveur
par défaut de repli.

Limites :

- Les fils de commentaires de ligne sont affichés, mais on ne peut pas y répondre
  depuis l’app : Forgejo n’a pas d’API pour répondre dans un fil existant.
  Répondez sur le serveur.
- https uniquement, un serveur Forgejo par profil.
- Les listes affichent les 50 premières pull requests et dépôts.

## Tickets, jalons, releases — GitHub

Parcourez les tickets et ouvrez un onglet de ticket complet : corps,
commentaires, étiquettes, assignés, jalon, champs Projects v2, fermeture et
réouverture, et **créer une branche pour ce ticket** (avec nommage par l'IA). Les
jalons affichent leur progression et leurs tickets. Les releases se parcourent
avec une page de changelog.

## En attente de votre revue

Dans la liste des pull requests de la barre latérale, un 👁 marque celles où
**vous** êtes relecteur sans avoir encore répondu — sur GitHub, GitLab et Forgejo.
Qui est « vous » est demandé à l’hôte avec l’identité du profil et mémorisé dix
minutes. Un jeton qui ne peut pas lire son propre utilisateur (sans `read:user`
sur Forgejo, par exemple) ne marque rien.

## Notifications — GitHub

Toute votre boîte de réception — demandes de revue, mentions, activité de CI —
tous dépôts confondus, avec des filtres non lues/toutes et le marquage comme lu.
La cloche de la barre d'outils porte un badge de non-lues, et des notifications
système optionnelles se déclenchent quand une revue est demandée ou quand la CI
se termine.

## Jetons

Des jetons par profil pour plusieurs comptes ou organisations, stockés dans le
trousseau de votre système. Gitcito peut aussi emprunter ce que votre
**assistant d'identifiants git** détient déjà : une organisation pour laquelle
vous vous êtes déjà authentifié ne demande souvent aucune configuration. Voir
[Sécurité et secrets](security.md).

Chaque profil **lie son propre compte**. Dans Réglages → Intégrations, **Se
connecter avec git** cherche une connexion déjà présente sur la machine — le
credential helper de git, puis le compte actif de **GitHub CLI**, puis la fenêtre
de connexion du helper — et lie ce compte au profil. Rien n'est partagé
implicitement : un nouveau profil commence déconnecté, et un compte déjà lié à
un autre profil est refusé. Pour lier un second compte GitHub, ajoutez-le à gh
(`gh auth login`), rendez-le actif (`gh auth switch`) et connectez-vous depuis
l'autre profil — ou collez le jeton de ce compte. Git ne demande jamais
d'identifiant ni de mot de passe dans un terminal.

La page indique si la connexion est le jeton du profil, son lien avec le helper
de git ou son lien avec GitHub CLI, et **Déconnecter** l'annule pour ce profil
seulement : un jeton est effacé (il reste valide chez l'hébergeur jusqu'à ce que
vous le révoquiez), un lien est retiré (la connexion reste dans gh ou le helper).

L'API de l'hébergeur — pull requests, issues, CI — et les fetch, pull et push
de git en https utilisent tous le jeton ou le compte lié du profil.
L'identifiant n'arrive à git que pour cette commande, limité à l'hôte du dépôt
distant, et n'est jamais écrit dans `.git/config`. Un profil sans l'un ni
l'autre laisse git à son propre credential helper. Azure DevOps, GitLab et
Bitbucket se lient via le credential helper de git — Git Credential Manager
garde plusieurs comptes par hébergeur — ou prennent un jeton par profil. Un lien
désigne un compte par hébergeur : des organisations qui demandent des comptes
différents prennent chacune un profil.

**Voir aussi :** [Branches empilées](stacks.md) · [Fonctions IA](ai.md)
