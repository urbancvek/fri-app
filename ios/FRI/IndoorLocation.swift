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
class IndoorLocation: RCTEventEmitter, IALocationManagerDelegate, CLLocationManagerDelegate {
  
  var manager: IALocationManager?;
  var locationManager: CLLocationManager?;
  var shouldLocate: Bool = false;
  
  override init() {
    super.init();
    
    let IAKey = "0bb20838-f3c5-4a7f-8c75-4fab9d3341c8";
    let IASecret = "it5C4XuQC!ScjqJej))0MHJBzRsikVZV1IIbvkZNsreA!FLVRm5lfxSMtrZZYdLrBZOe9GcBHYgjyFs(nPmpjnb)dlY(8TpanhISqECqRTL3Zr4mT(3yebIdObUb8qvu";
    
    self.locationManager = CLLocationManager();
    self.locationManager!.delegate = self;
    
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
  
  func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
    if (status == .authorizedWhenInUse && self.shouldLocate) {
      self.manager!.startUpdatingLocation();
      print("Started updating location!");
    }
  }
  
  @objc func startLocating() {
    self.shouldLocate = true;

    if (CLLocationManager.authorizationStatus() != .authorizedWhenInUse) {
      self.locationManager?.requestWhenInUseAuthorization();
    } else {
      self.manager!.startUpdatingLocation();
      print("Started updating location!");
    }
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
  
  func indoorLocationManager(_ manager: IALocationManager, didEnter region: IARegion) {
    if (region.type.rawValue == 1) {
      print("DID_ENTER_REGION", region.identifier!);
    }
  }
  
  func indoorLocationManager(_ manager: IALocationManager, didExitRegion region: IARegion) {
    if (region.type.rawValue == 1) {
      print("DID_EXIT_REGION", region.identifier!);
    }
  }
}
