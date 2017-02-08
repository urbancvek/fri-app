//
//  IndoorLocation.swift
//  FRI
//
//  Created by Urban Cvek on 20/01/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation;
import IndoorAtlas;

@objc(IndoorLocation)
class IndoorLocation: RCTEventEmitter, IALocationManagerDelegate {
  
  var manager: IALocationManager?;

  override init() {
    super.init();
    
    let IAKey = "acca4b18-d37b-4faf-b0b3-e2978cc41753";
    let IASecret = "IcfpIFOduVIA3Hw1gqbf9ER96V4KDNnfSvypOxrUdowL7MpDigG237BczhZxqFODlfHSP4OTmaMhirIPlJobTuAnjgCNkAiK5klY1l1AriBrBCJlKTpklUCorVM0SQ==";
    
    self.manager = IALocationManager();
    self.manager!.delegate = self;
    self.manager!.setApiKey(IAKey, andSecret: IASecret);
    self.manager!.location = IALocation(floorPlanId: "5ea15b19-b7fd-40a3-833b-666c514279d7");
  }
  
  override func supportedEvents() -> [String]! {
    return [
      "DID_UPDATE_LOCATION",
    ];
  }

  @objc func startLocating() {
    self.manager!.startUpdatingLocation();
    print("Started updating location!");
  }
  
  @objc func stopLocating() {
    self.manager!.stopUpdatingLocation();
    print("Stopped updating location!");
  }
  
  // IALocationManager delegate method that fires on location update
  func indoorLocationManager(_ manager: IALocationManager, didUpdateLocations locations: [Any]) {
    let iaLocation = (locations.last as! IALocation);
    let location: CLLocation = (iaLocation.location! as CLLocation);

    let body = [
      "coordinates": [location.coordinate.latitude, location.coordinate.longitude],
      "course": location.course,
      "floor": iaLocation.floor!.level
    ] as [String : Any];

    self.sendEvent(withName: "DID_UPDATE_LOCATION", body: body);
  }
}
