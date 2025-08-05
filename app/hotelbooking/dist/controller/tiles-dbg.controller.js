sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("hotelbooking.controller.tiles", {
        onInit() {
            const oView = this.getView();
            const oODataModel = this.getOwnerComponent().getModel(); 
            const oJSON = new sap.ui.model.json.JSONModel();
            oView.setModel(oJSON, "viewModel");
            const oBinding = oODataModel.bindList("/Hotels");
        
            oBinding.requestContexts().then(function (aContexts) {
                const aHotels = aContexts.map(ctx => ctx.getObject());
                oJSON.setProperty("/Hotels", aHotels);
                oJSON.setProperty("/hotelCount", aHotels.length); 
            }).catch(function (err) {
                console.error("Failed to load Hotels", err);
            });
        },
        
        getHotelsCount: function (aHotels) {
            if (!aHotels || !Array.isArray(aHotels)) {
                return "0";
            }
            console.log("hotels",aHotels);
            
            return aHotels.length.toString();
        },        
        onNavToHotels:function(){
            const hotels= this.getOwnerComponent().getRouter();
            hotels.navTo("Routehotels")
        }
    });
});