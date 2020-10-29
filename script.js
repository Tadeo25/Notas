const formNotes = document.getElementById('formNotes')
const tittleInput = document.getElementById('tittle')
const textAreaInput = document.getElementById('textArea')
const categoryInput = document.getElementById('category')
const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};
// const formNotes = document.getElementById('formNotes')
// const formNotes = document.getElementById('formNotes')


formNotes.onsubmit = (e) => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    e.preventDefault();
    const tittle = tittleInput.value;
    const textArea = textAreaInput.value;
    const category = categoryInput.value;

    notes.push({
        tittle,
        textArea,
        category,
        id: generateId(),
        createdAt: Date.now(),
    })

    const notesJson = JSON.stringify(notes);
    localStorage.setItem('notes', notesJson);

    console.log("formNotes.onsubmit => notes", notes)
    formNotes.reset();
    displayNotes();
}

function displayNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const rows = [];
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const createdAt = new Date(note.createdAt);
        const tr = `
        <tr>
            <td>${note.tittle}</td>
            <td>${note.category || ' '}</td>
            <td>${createdAt.toLocaleString()}</td>

<td>
<button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#modal${note.id}">
  Ver nota
</button>


<div class="modal fade" id="modal${note.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">${note.tittle}</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body bg-dark">
        <h5>${note.category}</h5>
        <p class="text-center">${note.textArea}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Editar</button>
      </div>
    </div>
  </div>
</div>
</td>
        </tr>
        `
        rows.push(tr)
    }
    notesTable.innerHTML = rows.join('')
}
displayNotes();