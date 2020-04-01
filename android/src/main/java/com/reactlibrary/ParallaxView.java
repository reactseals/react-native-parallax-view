package com.reactlibrary;

import android.content.Context;
import android.graphics.PointF;
import android.graphics.Rect;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.view.ReactViewGroup;

import androidx.annotation.Nullable;

public class ParallaxView extends ReactViewGroup {
    private ReactContext reactContext;

    public ParallaxView(Context context) {
        super(context);
        reactContext = (ReactContext) this.getContext();
    }

}
