package com.reactlibrary;

import android.view.View;

import androidx.appcompat.widget.AppCompatCheckBox;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ViewGroupManager;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;
import com.facebook.react.views.view.ReactViewManager;

import javax.annotation.Nullable;

public class ParallaxViewManager extends ReactViewManager {

    public static final String REACT_CLASS = "ParallaxView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public ParallaxView createViewInstance(ThemedReactContext c) {
        return new ParallaxView(c);
    }

    @ReactProp(name = "tvParallaxProperties")
    public void setTVParallaxProperties(ParallaxView parallaxView, @Nullable ReadableMap tvParallaxProperties) {
        parallaxView.setTVParallaxProperties(tvParallaxProperties);
    }
}
