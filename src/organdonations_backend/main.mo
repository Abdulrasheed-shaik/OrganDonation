import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import RBTree "mo:base/RBTree";
import Float "mo:base/Float";
import Time "mo:base/Time";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Buffer "mo:base/Buffer";
actor {

  type Gender = {
    #Male;
    #Female;
  };

  type Donor1 = {
    fullName : Text;
    age : Text;
    gender : Text;
    medicalId : Text;
    mobileNumber : Text;
    bloodGroup : Text;
    organs : [Text];
    height : Text;
    weight : Text;
  };

  type Patient1 = {
    fullName : Text;
    age : Text;
    gender : Text;
    medicalId : Text;
    mobileNumber : Text;
    bloodGroup : Text;
    organsAffected : Text;
    height : Text;
    weight : Text;
  };

  type Donor = {
    name : Text;
    dob : Text;
    gender : Gender;
    specialization : Text;
    requests : [Text];
  };

  type Patient = {
    name : Text;
    dob : Text;
    gender : Gender;
    donors : [Principal];
    noofrecords : Nat;
    requests : [Text];
  };

  type RequestStatus = {
    #Complete;
    #Reject;
    #Accept;
    #Nota;
  };

  type Request = {
    patientPrincipal : Principal;
    donorPrincipal : Principal;
    expries : Time.Time;
    note : Text;
    status : RequestStatus;
    isEmergency : Bool;
    requestedOn : Time.Time;
  };

  var patients = RBTree.RBTree<Principal, Patient>(Principal.compare);
  var donors = RBTree.RBTree<Principal, Donor>(Principal.compare);
  var requests = RBTree.RBTree<Text, Request>(Text.compare);

  // function to create a Donor account
  public shared (msg) func createDonor(name : Text, dob : Text, gender : Gender, specialization : Text) : async {
    statusCode : Nat;
    msg : Text;
  } {
    if (not Principal.isAnonymous(msg.caller)) {
      var donor = donors.get(msg.caller);
      switch (donor) {
        case (null) {
          var patient = patients.get(msg.caller);
          switch (patient) {
            case (null) {
              var donor : Donor = {
                name = name;
                dob = dob;
                gender = gender;
                specialization = specialization;
                requests = [];
              };
              donors.put(msg.caller, donor);
              return {
                statusCode = 200;
                msg = "Registered as Donor Successfully.";
              };
            };
            case (?patient) {
              return {
                statusCode = 403;
                msg = "A patient Account Exists with this Identity";
              };
            };
          };
        };
        case (?patient) {
          return {
            statusCode = 403;
            msg = "Donor Already Exists with this Identity";
          };
        };
      };
    } else {
      return {
        statusCode = 404;
        msg = "Connect Wallet To Access This Function";
      };
    };
  };

  // function to create a patient account
  public shared (msg) func createPatient(name : Text, dob : Text, gender : Gender) : async {
    statusCode : Nat;
    msg : Text;
  } {
    if (not Principal.isAnonymous(msg.caller)) {
      var patient = patients.get(msg.caller);
      switch (patient) {
        case (null) {
          var donor = donors.get(msg.caller);
          switch (donor) {
            case (null) {
              var patient : Patient = {
                name = name;
                dob = dob;
                gender = gender;
                donors = [];
                noofrecords = 0;
                requests = [];
              };
              patients.put(msg.caller, patient);
              return {
                statusCode = 200;
                msg = "Registered as Patient Successfully.";
              };
            };
            case (?donor) {
              return {
                statusCode = 403;
                msg = "A Donor Account Exists with this Identity";
              };
            };
          };
        };
        case (?patient) {
          return {
            statusCode = 403;
            msg = "Patient account Already Exists with this Identity";
          };
        };
      };
    } else {
      return {
        statusCode = 404;
        msg = "Connect Wallet To Access This Function";
      };
    };
  };

  // function to check whether caller has a account or not
  public shared query (msg) func isAccountExists() : async {
    statusCode : Nat;
    msg : Text;
    principal : Principal;
  } {
    if (not Principal.isAnonymous(msg.caller)) {
      var patient = patients.get(msg.caller);
      switch (patient) {
        case (null) {
          var donor = donors.get(msg.caller);
          switch (donor) {
            case (null) {
              return { statusCode = 200; msg = "null"; principal = msg.caller };
            };
            case (?donor) {
              return {
                statusCode = 200;
                msg = "donor";
                principal = msg.caller;
              };
            };
          };
        };
        case (?patient) {
          return { statusCode = 200; msg = "Patient"; principal = msg.caller };
        };
      };
    } else {
      return {
        statusCode = 404;
        msg = "Connect Wallet To Access This Function";
        principal = msg.caller;
      };
    };
  };

  public shared query (msg) func getDonorDetails() : async {
    statusCode : Nat;
    doc : ?Donor;
    msg : Text;
  } {
    if (not Principal.isAnonymous(msg.caller)) {
      var donor = donors.get(msg.caller);
      switch (donor) {
        case (null) {
          return {
            statusCode = 403;
            doc = null;
            msg = "This identity doesn't have any Donor Account";
          };
        };
        case (?donor) {
          return {
            statusCode = 200;
            doc = ?donor;
            msg = "Retrived Donor Details Successsfully.";
          };
        };
      };
    } else {
      return {
        statusCode = 404;
        doc = null;
        msg = "Connect Wallet To Access This Function";
      };
    };
  };

  public shared query (msg) func getPatientDetails() : async {
    statusCode : Nat;
    patient : ?Patient;
    msg : Text;
  } {
    if (not Principal.isAnonymous(msg.caller)) {
      var patient = patients.get(msg.caller);
      switch (patient) {
        case (null) {
          return {
            statusCode = 403;
            patient = null;
            msg = "This identity doesn't have any Patient Account";
          };
        };
        case (?patient) {
          return {
            statusCode = 200;
            patient = ?patient;
            msg = "Retrived Patient Details Successsfully.";
          };
        };
      };
    } else {
      return {
        statusCode = 404;
        patient = null;
        msg = "Connect Wallet To Access This Function";
      };
    };
  };
  var donors1 : [Donor1] = [];
  var patients1 : [Patient1] = [];

  /*public shared {
    submitDonor : (Donor) -> async ();
    getDonors : () -> async [Donor];
  };*/

  public shared func submitDonor(donor : Donor1) : async () {
    donors1 := Array.append<Donor1>(donors1, [donor]);
  };

  public shared query func getDonors() : async [Donor1] {
    return donors1;
  };

  public shared func submitPatient(patient : Patient1) : async () {
    patients1 := Array.append<Patient1>(patients1, [patient]);
  };

  public shared query func getPatients() : async [Patient1] {
    return patients1;
  };
};
