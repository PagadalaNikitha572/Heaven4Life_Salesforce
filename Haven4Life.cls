public with sharing class Haven4Life {
    @AuraEnabled
    public static List<Volunteer__c> getVolunteerRecs(){
        List<Volunteer__c> volunteerList = [SELECT Id,Name,Address__c,Email__c,Image__c,Phone_number__c FROM Volunteer__c ORDER BY Name LIMIT 10000];
        return volunteerList;
    } 
    
    @AuraEnabled
    public static List<Shelter__c> getShelterRecDetails(){
       List<Shelter__c> shelterList = [SELECT Id,Name,Address__c,Type__c,Vancancies__c,Email__c,Image__c,Phone_number__c FROM Shelter__c ORDER BY Name LIMIT 10000];
        return shelterList;
    }
    
    @AuraEnabled
    public static List<Refugee__c> getRefugeeRecDetails(){
        List<Refugee__c> unshelteredList = [SELECT Id,Shelter_ID__c,Volunteer_ID__c,Name,Address__c,Email__c,Image__c,Phone_number__c FROM Refugee__c where Shelter_ID__c = '' ORDER BY Name LIMIT 10000];
        return unshelteredList;
    }
    
     @AuraEnabled
    public static void assignShelterRec(String shelterId, String unshelteredId){
        Refugee__c ref = [SELECT Id,Shelter_ID__c FROM Refugee__c WHERE Id = :unshelteredId];
        ref.Shelter_ID__c = shelterId;
        update ref;
        
        Shelter__c shelterList = [SELECT Id,Vancancies__c FROM Shelter__c where Id=:shelterId];
        shelterList.Vancancies__c = shelterList.Vancancies__c - 1;
        update shelterList;
    }
    
    @AuraEnabled
    public static List<Donator__c> getDonationDetails(){
        List<Donator__c> donatorList = [SELECT Id,Shelter_ID__c,Shelter_ID__r.Name,Amount__c,Name,City__c FROM Donator__c ORDER BY Name LIMIT 10000];
        return donatorList;
    }
    
    @AuraEnabled
    public static Donator__c getDonationInfo(){
        User u = [Select Name,City from User where Id = :UserInfo.getUserId()];
        Donator__c donatorRec = [SELECT Id,Shelter_ID__c,Shelter_ID__r.Name,Amount__c,Name,City__c FROM Donator__c where Name=: u.Name ORDER BY createdDate DESC LIMIT 1];
        return donatorRec;
    }
    
    @AuraEnabled
    public static String getLoggedInProfileName(){
        Id profileId = UserInfo.getProfileId();
		String profileName =[Select Id, Name from Profile where Id=:profileId].Name;
        return profileName;
    }
    
    @AuraEnabled
    public static void createDonationRec(String shelterId, Decimal amountDonated){
        Donator__c donationRec = new Donator__c();
        User u = [Select Name,City from User where Id = :UserInfo.getUserId()];
        donationRec.Name = u.Name;
        donationRec.Shelter_ID__c = shelterId;
        donationRec.Amount__c = amountDonated;
        donationRec.City__c = u.City;
        insert donationRec;
    }
    
    
}