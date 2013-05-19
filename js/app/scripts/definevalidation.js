/**
 * Sets label,input html5 attributes and css based on the validation attributes of the
 * model for the given dataSource
 * @param {Object} myDs    dataSource that contains the Model Schema used for validation.
 */
function addValidationAttributes(myDs) {

    var myFields
    //Pass in DS or pass in model from grid
    if (myDs.options) {
        myFields = myDs.options.schema.model.fields
    } else//model
    {
        myFields = myDs.fields
    }

    $.each(myFields, function(fieldName) {
        //Add validation attributes
        if (this.validation) {
            $('#' + fieldName).attr(this.validation);
            //Set label to required if field is required
            if (this.validation.required) {
                $('label[for=' + fieldName + ']').addClass('required');
                $('#' + fieldName).attr('title', "required");
                //Check if KendoUI widget because it creates an extra span
                if ($('#' + fieldName).is('[data-role]')) {
                    $('.k-widget').after('<span class="k-invalid-msg" data-for="' + fieldName + '"></span>');
                } else {
                    $('#' + fieldName).after('<span class="k-invalid-msg" data-for="' + fieldName + '"></span>');
                }
            }
        } else//optional
        {
            //Non requried fields set to optional exclude KEY ID STAMP
            if (fieldName !== '__KEY' && fieldName !== '__STAMP' && fieldName !== 'ID') {
                //Check if KendoUI widget because it creates an extra span
                if ($('#' + fieldName).is('[data-role]')) {
                    $('.k-widget').after('<span class="optional" data-for="' + fieldName + '"></span>');
                } else {
                    $('#' + fieldName).after('<span class="optional" data-for="' + fieldName + '"></span>');
                }
            }
        }

    });
}

/**
 * Function to setup css validation classes for OnBlur event of inputs
 * @param {String} myForID  ID of form to setup validation
 * @return {Object}         Returns a new KendoUI.Validator for myFormID
 */
function setupValidationBlur(myFormId) {
    var validator;
    $('input:not([type=button]').blur(function(event) {

        var isValid = event.target.checkValidity();
        if (isValid === false) {

            $(event.target).css({
                'box-shadow' : '0 0 5px #d45252',
                'border-color' : '#b03535'
            });
        } else {
            $(event.target).css({
                'box-shadow' : '0 0 5px #5cd053',
                'border-color' : '#28921f'
            });
        }
    });

    if (myFormId.jquery) {//KendoUI object is being passed
        validator = myFormId.kendoValidator().data("kendoValidator");
    } else {//String id passed
        validator = $('#' + myFormId).kendoValidator().data("kendoValidator");
    }
    return validator;
}

/**
 * Runs addValidationAttributes
 * Runs setupValidationBlur
 * Adds click event handler to Popup Edit Update Button to check for validation
 * errors and display errors if found, else continue submit
 * @param {Obect}   e   Reference the edit obect from grid edit function
 */
function setupGridValidationandSubmit(e) {

    addValidationAttributes(e.model);
    myValidator = setupValidationBlur(e.container)
    e.sender.editable.validatable = myValidator
    e.container.find('.k-grid-update').click(function() {
        if (!myValidator.validate()) {
            displayErrors(myValidator)
        }
    });
    gridSumbitEnterAutoFocus(e);
}

/**
 * Adds Keypress Enter for Grid Popup Edit Forms and ESC to close Popup Edit
 * Also sets focus to elements with autofocus attribute, usefull to set first
 * input field to focus when Popup Edit Form is displayed
 * @param {Obect}   e   Reference the edit obect from grid edit function
 */
function gridSumbitEnterAutoFocus(e) {

    //Align buttons
    //e.container.find('.k-grid-update,.k-grid-cancel').css('float','right');
    //e.container.find(".k-grid-update").insertAfter(".k-grid-cancel");
    e.container.keypress(function(event) {
        //if the key press is ESC or Enter
        if (event.keyCode === 27) {//ESC
            //If you use the normal KendoUIWindow.close() on the next time you edit a
            //record the data is screwed up, but the Cancel button works fine so this
            //Emulates the Cancel button
              e.container.find('.k-grid-cancel').focus().click();
        } else if (event.keyCode === 13) {//ENTER
             e.container.find('.k-grid-update').focus().click();
        }
    });
    e.container.data('kendoWindow').bind('activate', function(e) {
        $('[autofocus]').focus()
    })
}
