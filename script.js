// script.js
document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const exercises = e.target.result.split('\n').filter(line => line.trim());
            displayExercises(exercises);
        };
        reader.readAsText(file);
    }
});

document.getElementById('print').addEventListener('click', function() {
    window.print();
});

function displayExercises(exercises) {
    const days = parseInt(document.getElementById('days').value, 10);
    const container = document.getElementById('exercise-container');
    container.innerHTML = '';

    for (let i = 1; i <= days; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerHTML = `<h2>اليوم ${i}</h2>`;

        exercises.forEach(exercise => {
            const exerciseDiv = document.createElement('div');
            exerciseDiv.className = 'exercise';

            const exerciseText = document.createElement('input');
            exerciseText.type = 'text';
            exerciseText.value = exercise;
            exerciseText.readOnly = true;

            const repsInput = document.createElement('input');
            repsInput.type = 'text';
            repsInput.placeholder = 'التكرار (مثال: 3 × 10)';

            exerciseDiv.appendChild(exerciseText);
            exerciseDiv.appendChild(repsInput);
            dayDiv.appendChild(exerciseDiv);
        });

        container.appendChild(dayDiv);
    }
}