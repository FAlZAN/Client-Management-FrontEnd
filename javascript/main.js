const mainForm = document.querySelector(".main-form");
const opportunityId = document.querySelector(".opportunity-id");
const executiveName = document.querySelector(".executive-name");
const teamLeaderName = document.querySelector(".team-leader");
const customerName = document.querySelector(".customer-name");
const leadStage = document.querySelector(".lead-stage");
const leadSource = document.querySelector(".lead-source");
const calledDate = document.querySelector(".called-date");
const followUpRemark = document.querySelector(".follow-up-remark");
const followUpDate = document.querySelector(".follow-up-date");
const followUpTime = document.querySelector(".follow-up-time");
const followUpBtn = document.querySelector(".follow-up-btn");
const doneBtn = document.querySelector(".done-btn");
const disposedDataTable = document.querySelector(
  ".diposed-data-table table tbody"
);
const disposedDataTemplate = document.querySelector(".disposed-data-template");
const followUpDataTable = document.querySelector(
  ".follow-up-data-table table tbody"
);
const followUpDataTemplate = document.querySelector(".follow-up-data-template");

window.onload = () => {
  retrieve();
};

//Data Submit
followUpBtn.addEventListener("click", () => {
  mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  fetch("http://127.0.0.1:4000/api/followup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      opportunityId: opportunityId.value,
      executiveName: executiveName.value,
      teamLeader: teamLeaderName.value,
      customerName: customerName.value,
      leadStage: leadStage.value,
      leadSource: leadSource.value,
      calledDate: calledDate.value.split("-").reverse().join("-"),
      followUpRemark: followUpRemark.value,
      followUpDate: followUpDate.value.split("-").reverse().join("-"),
      followUpTime: followUpTime.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

doneBtn.addEventListener("click", () => {
  mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  fetch("http://127.0.0.1:4000/api/disposed", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      opportunityId: opportunityId.value,
      executiveName: executiveName.value,
      teamLeader: teamLeaderName.value,
      customerName: customerName.value,
      leadStage: leadStage.value,
      leadSource: leadSource.value,
      calledDate: calledDate.value.split("-").reverse().join("-"),
      disposedDate: calledDate.value.split("-").reverse().join("-"),
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

//Data Retrieve
function retrieve() {
  fetch("http://localhost:4000/api/alldisposed")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      Object.values(data).forEach((entry) => {
        const disposedDataTemplateClone =
          disposedDataTemplate.content.cloneNode(true).children[0];

        let opportunityId = disposedDataTemplateClone.querySelector(
          ".disposed-opportunity-id"
        );

        let executiveName = disposedDataTemplateClone.querySelector(
          ".disposed-executive-name"
        );
        let teamLeaderName = disposedDataTemplateClone.querySelector(
          ".disposed-team-leader"
        );
        let customerName = disposedDataTemplateClone.querySelector(
          ".disposed-customer-name"
        );
        let leadStage = disposedDataTemplateClone.querySelector(
          ".disposed-lead-stage"
        );
        let leadSource = disposedDataTemplateClone.querySelector(
          ".disposed-lead-source"
        );
        let calledDate = disposedDataTemplateClone.querySelector(
          ".disposed-called-date"
        );
        let disposedDate = disposedDataTemplateClone.querySelector(
          ".disposed-disposed-date"
        );

        opportunityId.textContent = entry.opportunityId;
        executiveName.textContent = entry.executiveName;
        teamLeaderName.textContent = entry.teamLeader;
        customerName.textContent = entry.customerName;
        leadStage.textContent = entry.leadStage;
        leadSource.textContent = entry.leadSource;
        calledDate.textContent = entry.calledDate;
        disposedDate.textContent = entry.disposedDate;

        disposedDataTable.appendChild(disposedDataTemplateClone);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  fetch("http://localhost:4000/api/allfollowup")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      Object.values(data).forEach((entry) => {
        const followUpDataTemplateClone =
          followUpDataTemplate.content.cloneNode(true).children[0];

        let opportunityId = followUpDataTemplateClone.querySelector(
          ".follow-opportunity-id"
        );

        let executiveName = followUpDataTemplateClone.querySelector(
          ".follow-executive-name"
        );
        let teamLeaderName = followUpDataTemplateClone.querySelector(
          ".follow-team-leader"
        );
        let customerName = followUpDataTemplateClone.querySelector(
          ".follow-customer-name"
        );
        let leadStage =
          followUpDataTemplateClone.querySelector(".follow-lead-stage");
        let leadSource = followUpDataTemplateClone.querySelector(
          ".follow-lead-source"
        );
        let calledDate = followUpDataTemplateClone.querySelector(
          ".follow-called-date"
        );

        let followUpRemark = followUpDataTemplateClone.querySelector(
          ".follow-follow-up-remark"
        );

        let followUpDate = followUpDataTemplateClone.querySelector(
          ".follow-follow-up-date"
        );

        let followUpTime = followUpDataTemplateClone.querySelector(
          ".follow-follow-up-time"
        );
        let disposeBtn = followUpDataTemplateClone.querySelector(
          ".follow-dispose-btn"
        );

        opportunityId.textContent = entry.opportunityId;
        executiveName.textContent = entry.executiveName;
        teamLeaderName.textContent = entry.teamLeader;
        customerName.textContent = entry.customerName;
        leadStage.textContent = entry.leadStage;
        leadSource.textContent = entry.leadSource;
        calledDate.textContent = entry.calledDate;
        followUpRemark.textContent = entry.followUpRemark;
        followUpDate.textContent = entry.followUpDate;

        followUpTime.textContent = entry.followUpTime;

        followUpDataTable.appendChild(followUpDataTemplateClone);

        disposeBtn.addEventListener("click", () => {
          console.log("dispose btn inside follow up clicked.");
          let dateInstance = new Date();
          let disposedDate = `${dateInstance.getDate()}-${
            dateInstance.getMonth() + 1
          }-${dateInstance.getFullYear()}`;

          fetch("http://127.0.0.1:4000/api/disposed", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              opportunityId: opportunityId.innerText,
              executiveName: executiveName.innerText,
              teamLeader: teamLeaderName.innerText,
              customerName: customerName.innerText,
              leadStage: leadStage.innerText,
              leadSource: leadSource.innerText,
              calledDate: calledDate.innerText,
              disposedDate: disposedDate,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);

              // Delete Request
              fetch("http://127.0.0.1:4000/api/adocument", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: entry._id,
                }),
              })
                .then((response) => response.json())
                .then((data) => console.log(data));
            });
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

//Exporting HTML Table Data to Excel File using SheetJs library
let disposedExportBtn = document.querySelector(".disposed-export-btn");
let followUpExportBtn = document.querySelector(".follow-up-export-btn");
let disposedDataExport = document.querySelector(".diposed-data-table table");
let followUpDataExport = document.querySelector(".follow-up-data-table table");

//Converting Disposed Data
disposedExportBtn.addEventListener("click", () => {
  let filePointer = XLSX.utils.table_to_book(disposedDataExport, {
    sheet: "Sheet",
  });
  XLSX.write(filePointer, {
    bookType: "xlsx",
    type: "base64",
  });
  XLSX.writeFile(filePointer, "DisposedData.xlsx");
  console.log("Disposed Data to Excel Converted Successfully.");
});

//Converting Follow Up Data
followUpExportBtn.addEventListener("click", () => {
  console.log("disposed export button clicked.");
  let filePointer = XLSX.utils.table_to_book(followUpDataExport, {
    sheet: "Sheet",
  });
  XLSX.write(filePointer, {
    bookType: "xlsx",
    type: "base64",
  });
  XLSX.writeFile(filePointer, "FollowUpData.xlsx");
  console.log("Follow Up Data to Excel Converted Successfully.");
});
