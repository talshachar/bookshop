'use strict';

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function makeBookTitle(noun) {
    var adj = ['Unbelievable', 'The Horror of', '7 Shocking', 'The Secrets of', 'This is', 'The Dummies', 'Worst', 'Ridiculous Similarities of', 'Can', 'This is Why', 'Hitler\'s Final Words on', '17 Facts About'];
    var closure = ['Silly Stories', 'Mistakes', 'Latest Findings', 'Teachers didn\'t Tell You!', '101.', 'Guide', 'Causes for Pain', 'to Shrek 2', 'be Fun!?', 'Will Break Your Heart', '' ,'That\'ll Keep You Up At Night']
    var randIdx = Math.floor(Math.random() * adj.length)
    var title = adj[randIdx] + ' ' + noun + ' ' + closure[randIdx];
    return title;
}

function getRandomFloat(min, max, decimalPlaces) {
    return +(Math.random() * (max - min) + min).toFixed(decimalPlaces)
}