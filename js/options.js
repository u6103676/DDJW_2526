import {$} from "../library/jquery-4.0.0.slim.module.min.js";

var options = function(){
    const default_options = {
        pairs: 2,
        difficulty: 'normal',
        groupSize: 2
    } 

    var pairs = $('#pairs');
    var difficulty = $('#dif');
    var groupSize = $('#groupSize');
    
    var savedOptions = localStorage.options && JSON.parse(localStorage.options);
    var options = Object.create(default_options);

    if (savedOptions && savedOptions.pairs)
        options.pairs = savedOptions.pairs;
    if (savedOptions && savedOptions.difficulty)
        options.difficulty = savedOptions.difficulty;
    if (savedOptions && savedOptions.groupSize) 
        options.groupSize = savedOptions.groupSize;

    pairs.val(options.pairs);
    difficulty.val(options.difficulty);
    groupSize.val(options.groupSize);

    pairs.on('change', function (){
        options.pairs = pairs.val();
    });

    difficulty.on('change', function (){
        options.difficulty = difficulty.val();
    });

    groupSize.on('change', function (){
        options.groupSize = groupSize.val();
    });    

    return {
        applyChanges: function(){
            localStorage.options = JSON.stringify(options);
        },
        defaultValues: function(){
            options.pairs = default_options.pairs;
            options.difficulty = default_options.difficulty;
            options.groupSize = default_options.groupSize;
            pairs.val(options.pairs);
            difficulty.val(options.difficulty);
            groupSize.val(options.groupSize);
        }
    }
}();

$('#default').on('click', function(){
    options.defaultValues();
})

$('#apply').on('click', function(){
    options.applyChanges();
    location.assign("../");
});

document.addEventListener('DOMContentLoaded', () => {
    const modeSelector = document.getElementById('gameModeConfig');
    const config1 = document.getElementById('config-mode-1');
    const config2 = document.getElementById('config-mode-2');
    const applyBtn = document.getElementById('apply');
    const defaultBtn = document.getElementById('default');
    const savedOptions = localStorage.getItem('options') ? JSON.parse(localStorage.getItem('options')) : null;
    if (savedOptions) {
        document.getElementById('pairs').value = savedOptions.pairs || 2;
        document.getElementById('groupSize').value = savedOptions.groupSize || 2;
        document.getElementById('startLevel').value = savedOptions.startLevel || 1;
        const difSelector = document.getElementById('dif');
        const validValues = ["500", "1000", "2000"];
        if (validValues.includes(savedOptions.difficulty)) {
            difSelector.value = savedOptions.difficulty;
        } 
        else {
            difSelector.value = "1000"; 
        }
    } 
    else {
        document.getElementById('dif').value = "1000";
    }
    modeSelector.addEventListener('change', () => {
        if (modeSelector.value === "1") {
            config1.style.display = 'block';
            config2.style.display = 'none';
        } 
        else {
            config1.style.display = 'none';
            config2.style.display = 'block';
        }
    });
    applyBtn.addEventListener('click', () => {
        const options = {
            pairs: document.getElementById('pairs').value,
            groupSize: document.getElementById('groupSize').value,
            startLevel: document.getElementById('startLevel').value,
            difficulty: document.getElementById('dif').value
        };
        localStorage.setItem('options', JSON.stringify(options));
        alert("Configuració guardada correctament!");
        window.location.assign("../index.html");
    });
    defaultBtn.addEventListener('click', () => {
        if (confirm("Vols restablir els valors per defecte?")) {
            localStorage.removeItem('options');
            location.reload(); 
        }
    });
});