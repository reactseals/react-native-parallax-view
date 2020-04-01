package com.reactlibrary;

import android.view.View;

import androidx.appcompat.widget.AppCompatCheckBox;
import com.facebook.react.uimanager.ViewGroupManager;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.view.ReactViewGroup;
import com.facebook.react.views.view.ReactViewManager;

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
}
