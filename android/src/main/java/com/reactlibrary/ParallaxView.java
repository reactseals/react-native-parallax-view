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

    @Override
    protected void onFocusChanged(boolean gainFocus, int direction, @Nullable Rect previouslyFocusedRect) {
        super.onFocusChanged(gainFocus, direction, previouslyFocusedRect);
        if (gainFocus) {
            zoom(1.1f, 1.1f, new PointF(getWidth() / 2, getHeight() / 2));
        } else {
            zoom(1f, 1f, new PointF(getWidth() / 2, getHeight() / 2));
        }
    }

    public void zoom(Float scaleX, Float scaleY, PointF pivot) {
        setPivotX(pivot.x);
        setPivotY(pivot.y);
        setScaleX(scaleX);
        setScaleY(scaleY);
    }
}
