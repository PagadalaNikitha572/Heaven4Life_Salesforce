({
    init: function (component) {
        component.set('v.updatedCount', 12);
        component.set('v.selectedItem', 'folders_About');
        var action = component.get("c.getVolunteerRecs");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.volunteerRecDetails",response.getReturnValue());
            }
            else if (state === "ERROR") {
                console.log("Error message: "+response.getError());
            }
        });
        $A.enqueueAction(action);
        var action1 = component.get("c.getShelterRecDetails");
        action1.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.shelterRecDetails",response.getReturnValue());
            }
            else if (state === "ERROR") {
                console.log("Error message: "+response.getError());
            }
        });
        $A.enqueueAction(action1);
        var action2 = component.get("c.getRefugeeRecDetails");
        action2.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.refugeeRecDetails",response.getReturnValue());
            }
            else if (state === "ERROR") {
                console.log("Error message: "+response.getError());
            }
        });
        $A.enqueueAction(action2);
        var action3 = component.get("c.getDonationDetails");
        action3.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.donatorRecDetails",response.getReturnValue());
            }
            else if (state === "ERROR") {
                console.log("Error message: "+response.getError());
            }
        });
        $A.enqueueAction(action3);
        var action4 = component.get("c.getLoggedInProfileName");
        action4.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.loggedInUserProfile",response.getReturnValue());
            }
            else if (state === "ERROR") {
                console.log("Error message: "+JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action4);
    },
    
    handleSelect : function(component, event, helper) {
        var selectedItem = event.getParam('name');
        component.set("v.selectedItem", selectedItem);
    },
    assignShelter : function(component, event, helper) {
        var selectedItem = event.getSource().get("v.name");
        component.set("v.selectedUnshelteredId", selectedItem);
        component.set("v.isModalOpen", true);
    },
    openModel: function(component, event, helper) {
      // Set isModalOpen attribute to true
      component.set("v.isModalOpen", true);
   },
    
    openDonateModel: function(component, event, helper) {
      component.set("v.isDonateModel", true);
   },
    
    openReceiptModel: function(component, event, helper) {
      var action = component.get("c.getDonationInfo");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.donationReceiptDetails",response.getReturnValue());
                var don = component.get("v.donationReceiptDetails");
                component.set("v.selectedValue",don[0].Shelter_Id__r.Name);
                component.set("v.amountDonated",don[0].Amount__c);
                component.set("v.isReceiptModel", true);
            }
            else if (state === "ERROR") {
                console.log("Error message: "+response.getError());
            }
        });
        $A.enqueueAction(action);
   },
  
   closeModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen", false);
      component.set("v.isDonateModel", false);
      component.set("v.isReceiptModel", false);
   },
  
   submitDetails: function(component, event, helper) {
      // Set isModalOpen attribute to false
      //Add your code to call apex method or do some processing
        var action = component.get("c.assignShelterRec");
        action.setParams({ 
            shelterId: component.get("v.selectedValue"),
            unshelteredId : component.get("v.selectedUnshelteredId")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                component.set("v.isModalOpen", false);
            } else {
                console.error('Error: ' + response.getError());
            }
        });
        $A.enqueueAction(action);
   },
    
    handlePicklistChange: function(component, event, helper) {
        var selectedValue = event.getSource().get("v.value");
        component.set("v.selectedValue", selectedValue);
    },
    
    handleNameChange: function(component, event, helper) {
        var selectedValue = event.getSource().get("v.value");
        component.set("v.selectedNameValue", selectedValue);
    },
    
    handleAmountChange: function(component, event, helper) {
        var selectedValue = event.getSource().get("v.value");
        component.set("v.amountDonated", selectedValue);
    },
    
    submitDonationDetails: function(component, event, helper) {
      // Set isModalOpen attribute to false
      //Add your code to call apex method or do some processing
        var action = component.get("c.createDonationRec");
        action.setParams({ 
            shelterId: component.get("v.selectedValue"),
            amountDonated : component.get("v.amountDonated")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.isDonateModel", false);
            } else {
                console.error('Error: ' + response.getError());
            }
        });
        $A.enqueueAction(action);
   }
})