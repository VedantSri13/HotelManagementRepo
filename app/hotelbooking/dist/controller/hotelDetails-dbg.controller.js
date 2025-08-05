sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("hotelbooking.controller.hotelDetails", {
      onInit() {
      },
      onLocations:function(){
        if (!this._oDialog) {
            this._oDialog = sap.ui.xmlfragment("hotelbooking.fragments.location", this);
            this.getView().addDependent(this._oDialog);
        }
        this._oDialog.open();
      },
      onValueHelpClose: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("selectedItem");
        oEvent.getSource().getBinding("items").filter([]);
        if (!oSelectedItem) {
          return;
        }
        this.byId("locationid").setValue(oSelectedItem.getTitle());
      },
      onValueHelpSearch: function (oEvent) {
        var sQuery = oEvent.getParameter("value");
        var oBinding = oEvent.getSource().getBinding("items");
        var oFilter = new sap.ui.model.Filter([
            new sap.ui.model.Filter("location", sap.ui.model.FilterOperator.Contains, sQuery),
        ], false); 
        oBinding.filter([oFilter]);
    },
    onSearch: function () {
        const oView = this.getView();
        const oTable = oView.byId("studentsTable");
        const oBinding = oTable.getBinding("items");
      
        const sLocation = oView.byId("locationid").getValue();
        const sRating = oView.byId("ratingCombo").getSelectedKey();
        const sPriceKey = oView.byId("priceCombo").getSelectedKey();
      
        const aFilters = [];
      
        if (sLocation) {
          aFilters.push(new sap.ui.model.Filter("location", sap.ui.model.FilterOperator.Contains, sLocation));
        }
      
        if (sRating) {
          aFilters.push(new sap.ui.model.Filter("rating", sap.ui.model.FilterOperator.EQ, parseFloat(sRating)));
        }

        switch (sPriceKey) {
            case "1":
              aFilters.push(new sap.ui.model.Filter("pricePerNight", sap.ui.model.FilterOperator.LT, 3000));
              break;
            case "2":
              aFilters.push(new sap.ui.model.Filter("pricePerNight", sap.ui.model.FilterOperator.BT, 3000, 5000));
              break;
            case "3":
              aFilters.push(new sap.ui.model.Filter("pricePerNight", sap.ui.model.FilterOperator.BT, 5000, 7000));
              break;
            case "4":
              aFilters.push(new sap.ui.model.Filter("pricePerNight", sap.ui.model.FilterOperator.GT, 7000));
              break;
          }        
      
        oBinding.filter(aFilters);
      }
      
  });
});