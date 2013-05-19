/**
 * Creates a KendoUI DropdownList from the specified html input element id
 * @param {String} dropDownId       Html ID of the input element to be turned into Kendo DropDown Widget
 * @param {Object} dropDownDs       dataSource that will be bound to the dropDownList
 * @param {Boolean} [required]      sets label and css attributes for ddl to required if true
 * @param {String} [textField]      overrides dataTextField of ddl
 * @param {String} [valueField]     overrides dataValueField of ddl
 * @param {String} [placeHolder]    default display if no items are selected
 */
function getDropdownList(dropDownId, dropDownDs, required, textField, valueField, placeHolder) {
    required = typeof required !== 'undefined' ? required : true;
    textField = typeof textField !== 'undefined' ? textField : 'name';
    valueField = typeof valueField !== 'undefined' ? valueField : '__KEY';
    placeHolder = typeof placeHolder !== 'undefined' ? placeHolder : 'Select a value';

    $('#' + dropDownId).kendoDropDownList({
        dataTextField : textField,
        dataValueField : valueField,
        dataSource : dropDownDs,
        autoBind : true,
        text : placeHolder,
        dataBound : function(e) {
           // this.select(0)
            this.text(placeHolder);
            //Used as a placeholder when nothing is selected
            //Will disappear when item is selected also when bound to viewModoel
            //item is selected and will also be removed so this works for add new, not sure
            //exactly how, optionLabel doesnt work well so use this instead
        }
    });
   
    return dropDownId;
}