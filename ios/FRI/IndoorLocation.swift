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
    
    let IAKey = "0bb20838-f3c5-4a7f-8c75-4fab9d3341c8";
    let IASecret = "it5C4XuQC!ScjqJej))0MHJBzRsikVZV1IIbvkZNsreA!FLVRm5lfxSMtrZZYdLrBZOe9GcBHYgjyFs(nPmpjnb)dlY(8TpanhISqECqRTL3Zr4mT(3yebIdObUb8qvu";
    
    self.manager = IALocationManager();
    self.manager!.delegate = self;
    self.manager!.setApiKey(IAKey, andSecret: IASecret);
    self.manager!.location = IALocation(floorPlanId: "5ea15b19-b7fd-40a3-833b-666c514279d7");
  }
  
  override func supportedEvents() -> [String]! {
    return [
      "onLocationChange"
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
    let location: CLLocation = ((locations.last as! IALocation).location! as CLLocation);
    
    let body = [
      "coordinates": [location.coordinate.latitude, location.coordinate.longitude],
      "course": location.course
      ] as [String : Any];

    self.sendEvent(withName: "onLocationChange", body: body);
  }
}
