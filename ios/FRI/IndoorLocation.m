//
//  IndoorLocation.m
//  FRI
//
//  Created by Urban Cvek on 20/01/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(IndoorLocation, RCTEventEmitter)

RCT_EXTERN_METHOD(startLocating)
RCT_EXTERN_METHOD(stopLocating)

@end
