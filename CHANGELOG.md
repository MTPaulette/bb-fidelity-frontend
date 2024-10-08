# Change Log

# BB-FIDELITY-SYST PROJECT (FRONTEND)

all notables changes to this project will be docummented in this file

## Version [1] 2024-07-16

[github project link](https://github.com/MTPaulette/bb-fidelity-frontend)

### ADDED

Date:   2024/08/08
- cursor progress during logout

Date:   2024/08/05
- adding filter
- changing baseURL

Date:   2024/08/02

- after presentation
- adaptaion of alert box message

Date:   2024/08/01
- credit and debit
- adding credential include in axios confi file
- get all users of service

Date:   2024/07/31

- delete service
- transform validdity input to select
- redirection according to status sending by the backend
- interceptor response

Date:   2024/07/30

- adding of sanctum-/csfr-cookie get route before login
- add headers config in axios

Date:   2024/07/29

- deploy
- run build
- before deploy
- promise reject
- forbidden route user.history for sample user
- regenerate token after change password
- starting axios interception

Date:   2024/07/28

- ready to deploy
- before deploy
- change application name
- change application name
- updated for backend v2
- starting adaptation for backend v2

Date:   2024/07/27

- before deploy
- before deploy

Date:   2024/07/26

- highlight darkmode
- logout oki
- check authorization front side in vue router
- highlight new created user and service
- avoid store datas in local storage

Date:   2024/07/25

- forbidden for all
- forbidden on service/create
- forbidden on show pages: user/id and service/id
- forbidden on indexes pages: users, purchases, services
- authorization start

Date:   2024/07/24

- affichage du nom de l utilisateur dans la liste de purchase
- purchase save in bd
- new purchase form created

Date:   2024/07/23

- all routes for history
- 404- unauthorize: check access user to one route
- ajout des routes d acces aux historiques

Date:   2024/07/22

- repercussion de la solution au probleme de la perte de donnees au raffraichissiment des pages avec un parametre id comme user/id service/id/ service/id/edit
- refactoring du store: creation des modules pour une meilleure gestion

Date:   2024/07/20

- resolution du probleme d'affichage
- mis a jour des informations d'un systeme identifie par son id

Date:   2024/07/19

- le probleme de perte de donnees apres raffrachaissement de la route service/id persiste
- ajout de l'indicateur de chargement(loading) lors du traitement du requete en base de donnees
- settimeout pour la suppression du flashalert apres 5secondes
- creation de la 404-not found page
- lazy-loaded bloque  l effet du dropdown
- chargement paresseux de toutes les routes lazy-loaded
- linkExactActiveLink pour le highlight du lien en cours dans la sidebar. ajout egalement du scrollbehavoir dans le router pour enregister la position actuel avant de quitter la page et y revenir a cette position la

Date:   2024/07/18

- creation d un nouveau service terminee
- affichage de la liste des services, des details d'un service et du formulaire de creation d;un nouveau service

Date:   2024/07/17

- vue pour les routes service list et service show
- vue show pour l affichage des informations utilisateur
- dropdown sidebbar, loggeduser

Date:   2024/07/16

- recuperation des donnees d un utilisateur a partir de son id
- crediter et debiter les points utilisateur avec verification lorsque l utilisateur a pas de point
- verification et mise a jour d un profile utilisateur
- verification des routes d authentification. redirection en cas d'utilisateur deja connecte


### Added dependencies
- "axios": "^1.5.0",
- "flowbite": "^2.4.1",
- "js-cookie": "^3.0.5",
- "moment": "^2.30.1",
- "nprogress": "^0.2.0",
- "vue": "^3.3.4",
- "vue-router": "^4.2.4",
- "vuex": "^4.0.2"

### Bug fixing
301 moved permanently: removing of slash / at the end of the route which create post

