let employees = [];
let table = null;

init();
async function init() {
  employees = await getAll();
  fillTable();

  table = new DataTable("#example", {
    //rowReorder: true,
    columnDefs: [
        {
            className: 'reorder',
            render: () => '≡',
            targets: 0
        },
        { orderable: false, targets: '_all' }
    ],
    order: [[1, 'asc']],
    rowReorder: {
        dataSrc: 1
    }
  });

  $("#dropZone").sortable({
    items: "tr",
    cursor: "move",
    opacity: 0.6,
    handle: "td.reorder",
    axis: "y",
    update: function (event, ui) {
      let newOrder = $("#dropZone").sortable("toArray", {
        attribute: "data-id",
      });

      //console.log(newOrder);

     
      let currentPage = table.page.info().page;
      //console.log("currentPage", currentPage);
      let pageSize = table.page.info().length;
      //console.log("pageSize", pageSize);
      let cpt = currentPage * pageSize;
      //console.log("cpt init", cpt);
      let orderedObjects = newOrder.map((id) => {
        cpt++;
        return { id: id, rank: cpt };
      });

      //console.log(orderedObjects);

      applyRanksUpdates(orderedObjects);
    },
  });
}

function fillTable() {
  employees.forEach((employee) => {
    $("#dropZone").append(`
            <tr data-id="${employee.id}">
                <td class="reorder"></td>
                <td>${employee.rank}</td>
                <td>${employee.id}</td>
                <td>${employee.firstname} ${employee.lastname}</td>
                <td>${employee.position}</td>
                <td>${employee.city}</td>
                <td>${employee.date}</td>
                <td>${employee.salary}</td>
            </tr>
        `);
  });
}
