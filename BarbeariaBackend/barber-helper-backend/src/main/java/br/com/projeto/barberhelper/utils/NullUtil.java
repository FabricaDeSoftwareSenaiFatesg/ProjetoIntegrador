package br.com.projeto.barberhelper.utils;

import java.util.Collection;

public class NullUtil {

    public static boolean isNull(final String value) {

        return value == null;

    }

    public static boolean isNotNull(final String value) {

        return !isNull(value);

    }

    public static boolean isEmpty(final String value) {

        return value != null && value.isEmpty();

    }

    public static boolean isNotEmpty(final String value) {

        return !isEmpty(value);

    }

    public static boolean isNullOrEmpty(final String value) {

        return isNull(value) || isEmpty(value);

    }

    public static boolean isNotNullOrEmpty(final String value) {

        return !isNull(value) || !isEmpty(value);

    }

    public static boolean isNullOrEmpty(Collection<?> colecao) {

        return colecao == null || colecao.isEmpty();

    }

    public static boolean isNotNullOrEmpty(Collection<?> colecao) {

        return !isNullOrEmpty(colecao);

    }

    public static boolean isNullOrEmpty(Long value) {

        return value == null || value <= 0;

    }

}
