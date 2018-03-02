let cards = create_deck(5); // Jeux de decks. La fonction create_deck permet d'en créer autant de deck que l'on souhaite.

document.getElementById('clear').addEventListener('click',clear);
console.log(cards);

function create_deck(number){
    deck = [];
    for(i=0; i<number; i++){
        deck.push(0);
        console.log(deck);
    }
    return deck;
}

// réinitialisation
function clear(){
    for(i=0; i<cards.length; i++){
        cards[i] = 0;
        document.getElementById('span'+(i+1)).innerHTML = 0;
    }
}

// fait défiler le chiffre dans le deck selectionné en te référant à la liste de decks "cards"

function turn_card(bouton){

    let card_num = bouton.slice(4); //récupère le chiffre du span permet de déterminer le numéro du deck

    if (cards[card_num-1]<9){ // si le chiffre du deck est plus petit que 10
        cards[card_num-1] = cards[card_num-1]+1; // incrémente le chiffre du deck de 1
        document.getElementById(bouton).innerHTML = cards[card_num-1]; //affiche sur le deck sélectionné le chiffre
    }
    else{ //si le deck dépasse 9, ça se complique...
        
        //d'abord règle les cas spéciaux : le dernier et l'avant dernier chiffre
        if(card_num==1){ // cas spécial 1: si le deck est le dernier deck et qu'il dépasse 9
            
            cards[card_num-1] = 0; //réinitialise le deck
            document.getElementById(bouton).innerHTML = cards[card_num-1]; // affiche le résultat dans le span correspondant
        }
        else{
            if(card_num==2){ // cas spécial 2 : si l'avant dernier deck dépasse 9
                if(cards[card_num-2]<9){ // si le deck suivant (le dernier) est plus petit que 10

                    cards[card_num-1] = 0; // réinitialise le deck courant
                    document.getElementById(bouton).innerHTML = cards[card_num-1]; // affiche
                    
                    cards[card_num-2] = cards[card_num-2]+1; // incrément le deck suivant (le dernier) de 1
                    document.getElementById('span'+(card_num-1)).innerHTML = cards[card_num-2]; // affiche la valeur du deck suivant (le dernier) dans le span correspondant (le dernier)
                }
                if (cards[card_num-2] == 9){ // si le le deck suivant (le dernier) dépasse 9
                    cards[card_num-1] = 0; // réinitialise le deck courant
                    document.getElementById(bouton).innerHTML = cards[card_num-1]; // affiche

                    cards[card_num-2] = 9; // force la valeur du dernier deck à rester à 9
                    document.getElementById('span'+(card_num-1)).innerHTML = cards[card_num-2]; // affiche
                }
            }
            else{ // lorsque tous les cas spéciaux sont réglés, le code gère les autres cas de la chaîne
                if(cards[card_num-2]<9){ // tant que la valeur du deck suivant ne dépasse pas 9
                    cards[card_num-1] = 0; // réinit
                    document.getElementById(bouton).innerHTML = cards[card_num-1]; //affiche
                    
                    cards[card_num-2] = cards[card_num-2]+1; //incrémente la valeur du deck suivant de 1
                    document.getElementById('span'+(card_num-1)).innerHTML = cards[card_num-2]; //affiche
                }
                else{ // si la valeur du deck suivant dépasse 9
                    cards[card_num-1] = 0; // réinitialise la valeur du deck sourant à 0
                    document.getElementById(bouton).innerHTML = cards[card_num-1]; // affiche

                    turn_card('span'+(card_num-1))//récursion : répète toute la chaîne de commande sur le couple de deck et de span suivant.
                }
            }
        }
    }
}

//crée et affiche le nombre de decks nécessaires:

for(i=1 ; i<cards.length+1 ; i++){
    let span_create = document.createElement('span');
    span_create.setAttribute('id', 'span'+i);
    span_create.setAttribute('class','span_class');
    span_create.innerHTML = 0;
    document.getElementById('output').appendChild(span_create);
}

//attribue une action (turn_card) à chaque deck:

for(i=1 ; i<cards.length+1 ; i++){
    //console.log(i);
    spans = document.getElementById('span'+i);
    spans.addEventListener('click', function(){turn_card(this.id)});
}

