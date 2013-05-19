/**
 * Creates a new viewModel bound to a dataSource and a selectedRecord
 * @param {Object} myViewDS             dataSource which viewModel is bound to for CUD operations.
 * @param {String} mySelectedRecord     default data record from a datasource or grid row to bind to.
 * @param {String} [myParentKey]        if view is for 1-n then pass in parent record key for CUD operations.
 * @param {String} [myParentRecord]     used to delete parent record if adding new 1-n record
 * @param {Object} [myValidator]        if validating input fields pass in validator to check before CUD operations are called.
 * @return {Object}                     Returns a new viewModel.
 */
function getViewModel(myViewDS, mySelectedRecord, myParentKey, myParentEntity, myValidator) {
    var myViewmodel = kendo.observable({
        viewDS : myViewDS,
        selectedRecord : mySelectedRecord,
        hasChanges : false,
        selected : false,
        save : function(e) {
            if (this.hasChanges) {
                //If myValidator = null then we are not choosing to validate any fields for this ViewModel
                if (myValidator == null || myValidator.validate()) {
                    if (e.currentTarget.value == "Save") {
                        //If saving existing child record which has its own KEY remove parent record
                        if (myParentEntity !== null) {
                            delete this.selectedRecord[myParentEntity];
                        }
                    } else if (e.currentTarget.value == "Add") {
                        //Add is used for 1-n relationships such as Addresses for a Contact
                        //Just in case user is editing a selected row
                        // but clicks add instead of save go ahead and add as a new record
                        if (this.selected) {
                            //Remove KEY ID AND STAMP
                            delete this.selectedRecord.ID;
                            delete this.selectedRecord.__KEY;
                            delete this.selectedRecord.__STAMP;
                            delete this.selectedRecord[myParentEntity];
                        }
                        if (myParentKey !== null) {
                            //Add Parent record key
                            this.selectedRecord[myParentEntity] = {
                                __KEY : myParentKey
                            };
                        }
                    }
                    buildview(this);
                } else {
                    displayErrors(myValidator)
                }
            } else {
                //No data has been changed
                alert("No data has been changed")
            }
        },
        change : function(e) {
            this.set("hasChanges", true);
        }
    });
    return myViewmodel;
}

function buildview(myView) {
    //Sync DS
    myView.viewDS.data([myView.selectedRecord.toJSON()]);
    myView.viewDS.data()[0].dirty = myView.hasChanges;
    myView.viewDS.sync();
    //Reset DS
    delete myView.viewDS.data()[0];

    //Reset form
    myView.set("selectedRecord", {});
    myView.set("selected", false);
    myView.set("hasChanges", false);
}
