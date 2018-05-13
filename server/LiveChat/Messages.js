  Meteor.methods({


        SendsMessage: function(from, to, msg) {
            try {
                console.log("cdswcscqscsq")
                var result = Messages.insert({
                    from,to,msg,date:new Date(),Vue:false
                });
                if (result) {
                    return result;
                }
            } catch (err) {
                return err;
            }
        },
                SupprimerVueMessage: function(from) {
            try {
                var result = Messages.update({
                    $and: [{
                            "from": from
                        },
                        {
                            "to": Meteor.userId()
                        },
                        {
                            "Vue": false
                        }
                    ]
                }, {
                    $set: { Vue: true },
                }, { multi: true });
                if (result) {
                    return result;
                }
            } catch (err) {
                return err;
            }
        }
    });