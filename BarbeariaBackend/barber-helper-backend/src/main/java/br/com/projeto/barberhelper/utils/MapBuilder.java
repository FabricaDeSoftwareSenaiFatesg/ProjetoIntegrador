package br.com.projeto.barberhelper.utils;

import java.util.HashMap;
import java.util.Map;

public class MapBuilder {

    private Map<String, Object> map = new HashMap<String, Object>();

    public static MapBuilder create(String key, Object value) {

        MapBuilder builder = new MapBuilder();

        builder.map.put(key, value);

        return builder;
    }

    public MapBuilder map(String key, Object value) {

        this.map.put(key, value);

        return this;
    }

    public Map<String, Object> build() {

        return this.map;
    }

}
