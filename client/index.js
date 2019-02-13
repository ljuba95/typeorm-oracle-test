$(document).ready(() => {
    let zaposleni = [];
    let selectedRowId;
    const baseUrl = "http://localhost:3000";

    function tableRowMarkup(radnik) {
        return `<tr data-id="${radnik.id}" class="table-row">
                    <th scope="row">${radnik.id}</th>
                    <td>${radnik.imePrezime}</td>
                    <td>${getFormattedDatumRodjenja(radnik.datumRodjenja)}</td>
                    <td>${radnik.pol}</td>
                    <td>${radnik.sektor.naziv}</td>
                </tr>`;
    }

    function insertNewRow(radnik) {
        $('table > tbody:last-child').append(tableRowMarkup(radnik));
    }

    function updateRow(radnik) {
        $('tr[data-id="' + radnik.id + '"]').replaceWith(tableRowMarkup(radnik));
        $('tr[data-id="' + radnik.id + '"]').css("background-color", "#81f99d");
    }

    function deleteRow(id) {
        $('tr[data-id="' + id + '"]').css("background-color", "#dc3545");
        $('tr[data-id="' + id + '"]').fadeOut(1500);
        setTimeout(() => $('tr[data-id="' + id + '"]').remove(), 1500);
    }

    async function osveziTabelu() {
        try {
            let res = await fetch(baseUrl + "/radnik");
            zaposleni = await res.json();

            $("#table-body").html(zaposleni.map(tableRowMarkup).join(''));
            emptyFields();
        } catch (e) {
            console.log(e);
        }
    }

    function getFormattedDatumRodjenja(datum) {
        return datum.split('T')[0];
    }

    $('#btn-refresh').click(async function () {
        $(this).html('Loading..');
        await osveziTabelu();
        // $(this).html('<i class="fa fa-refresh"></i> Osvezi tabelu');
        setTimeout(() => $(this).html('<i class="fa fa-refresh"></i> Osvezi tabelu'), 500);
    });

    function disableButtons() {
        $('#btn-update').prop('disabled', true);
        $('#btn-delete').prop('disabled', true);
    }

    function enableButtons() {
        $('#btn-update').prop('disabled', false);
        $('#btn-delete').prop('disabled', false);
    }

    function populateFields(id) {
        let trenutni = zaposleni.find(zap => zap.id === id);
        $("#imePrezime").val(trenutni.imePrezime);
        $("#pol-select").val(trenutni.pol);
        $("#sektor-select").val(trenutni.sektor.id);
        $("#datumRodjenja").val(getFormattedDatumRodjenja(trenutni.datumRodjenja));
    }

    function emptyFields() {
        selectedRowId = null;
        $("#imePrezime").val('');
        $("#pol-select").val('M');
        $("#sektor-select").val(0);
        $("#datumRodjenja").val('Selektuj...');
    }
    //on select row handler
    $('table').on('click', '.table-row', function () {
        if ($(this).data("id") == selectedRowId) {
            $(this).css("background-color", "");
            disableButtons();
            emptyFields();
            return;
        }

        $(this).css("background-color", "#BEB5B5");
        $(this).siblings().css("background-color", "");
        selectedRowId = $(this).data("id");
        enableButtons();
        populateFields($(this).data("id"));
    });

    //dodaj novog
    $('#btn-add').click(async function (e) {
        e.preventDefault();
        let imePrezime = $("#imePrezime").val();
        let pol = $("#pol-select").val();
        let sektor = $("#sektor-select").val();
        let datumRodjenja = $("#datumRodjenja").val();
        try{
            let res = await fetch(baseUrl + "/radnik", {
                method: 'POST',
                body: JSON.stringify({imePrezime, pol, datumRodjenja, sektor}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let insertedRadnik = await res.json();
            if(!insertedRadnik.error){
                zaposleni.push(insertedRadnik);
                insertNewRow(insertedRadnik);
            }
        } catch(e) {
            console.log(e);
        }
    });

    //izmeni
    $('#btn-update').click(async function (e) {
        e.preventDefault();
        if(!selectedRowId) return;
        let imePrezime = $("#imePrezime").val();
        let pol = $("#pol-select").val();
        let sektor = $("#sektor-select").val();
        let datumRodjenja = $("#datumRodjenja").val();
        try{
            let res = await fetch(baseUrl + `/radnik/${selectedRowId}`, {
                method: 'PATCH',
                body: JSON.stringify({imePrezime, pol, datumRodjenja, sektor}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let updatedRadnik = await res.json();
            if(!updatedRadnik.error){
                zaposleni = zaposleni.map(zap => zap.id === updatedRadnik.id ? updatedRadnik : zap);
                console.log(zaposleni);
                updateRow(updatedRadnik);
            }
        } catch(e) {
            console.log(e);
        }

    });

    //obrisi
    $('#btn-delete').click(async function (e) {
        e.preventDefault();
        if(!selectedRowId) return;

        try{
            let res = await fetch(baseUrl + `/radnik/${selectedRowId}`, {
                method: 'DELETE'
            });
            zaposleni = zaposleni.filter(zap => zap.id !== selectedRowId);
            deleteRow(selectedRowId);
            selectedRowId = null;
            disableButtons();
            emptyFields();
        } catch(e) {
            console.log(e);
        }
    });


    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd'
    });

    osveziTabelu();

});