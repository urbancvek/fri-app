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

public class IndoorLocationModule extends ReactContextBaseJavaModule implements IALocationListener, IARegion.Listener {
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
            .emit("onLocationChange", params);
    }

    @Override
    public void onExitRegion(IARegion region) {
        // Check if floorplan
        if (region.getType() == 1) {
            Log.d("ReactNative", "Exit " + region.getId());
        }
    }

    @Override
    public void onEnterRegion(IARegion region) {
        // Check if floorplan
        if (region.getType() == 1) {
            Log.d("ReactNative", "Enter " + region.getId());
        }
    }

    @ReactMethod
    public void startLocating() {
        final IndoorLocationModule self = this;
        (new Handler(Looper.getMainLooper())).post(new Runnable() {
            @Override
            public void run() {
                self.locationManager = IALocationManager.create(context);
                self.locationManager.requestLocationUpdates(IALocationRequest.create(), self);
                self.locationManager.registerRegionListener(self);
                self.locationManager.setLocation(IALocation.from(IARegion.venue("0c0af175-e460-4e49-812e-7a7d7b415f37")));
                Log.d("ReactNative", "Started updating location!");
            }
        });
    }

    @Override
    public String getName() {
        return "IndoorLocation";
    }
}
