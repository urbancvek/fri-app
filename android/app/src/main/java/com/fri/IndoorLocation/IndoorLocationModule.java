package com.shopster.IndoorLocation;

import android.os.Bundle;
import android.util.Log;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.indooratlas.android.sdk.IALocation;
import com.indooratlas.android.sdk.IALocationListener;
import com.indooratlas.android.sdk.IALocationManager;
import com.indooratlas.android.sdk.IALocationRequest;
import com.indooratlas.android.sdk.IARegion;

public class IndoorLocationModule extends ReactContextBaseJavaModule implements IALocationListener {
    private ReactApplicationContext context;
    private IALocationManager locationManager;

    public IndoorLocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
      Log.d("ReactNative", "Status " + Integer.toString(status));
    }

    @Override
    public void onLocationChanged(IALocation location) {
        Log.d("ReactNative", location.getLatitude() + " : " + location.getLongitude());
        WritableMap params = Arguments.createMap();
        WritableArray coordinates = Arguments.createArray();
        coordinates.pushDouble(location.getLatitude());
        coordinates.pushDouble(location.getLongitude());

        params.putArray("coordinates", coordinates);
        params.putDouble("course", location.getBearing());
        params.putInt("floor", location.getFloorLevel());

        context
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("DID_UPDATE_LOCATION", params);
    }

    @ReactMethod
    public void startLocating() {
        final IndoorLocationModule self = this;
        (new Handler(Looper.getMainLooper())).post(new Runnable() {
            @Override
            public void run() {
                self.locationManager = IALocationManager.create(context);
                self.locationManager.setLocation(IALocation.from(IARegion.floorPlan("5ea15b19-b7fd-40a3-833b-666c514279d7")));
                IALocationRequest iaRequest = IALocationRequest.create();
                iaRequest.setSmallestDisplacement(1);
                iaRequest.setFastestInterval(500);
                self.locationManager.requestLocationUpdates(iaRequest, self);
                Log.d("ReactNative", "Started updating location!");
            }
        });
    }

    @ReactMethod
    public void stopLocating() {
        this.locationManager.removeLocationUpdates(this);
    }

    @Override
    public String getName() {
        return "IndoorLocation";
    }
}
