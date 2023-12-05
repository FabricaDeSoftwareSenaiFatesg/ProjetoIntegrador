package br.com.projeto.barberhelper.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class DateUtil {

	public static String format(final LocalDate date) {

		if( date == null ) {

			return null;

		}

		return date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

	}
	
	public static String format(final Date date) {
		
		if( date == null ) {
			
			return null;
			
		}
		
		return new SimpleDateFormat( "dd/MM/yyyy" ).format( date );
		
	}

	public static String formatPattern(final Date date, final String pattern) {

		if( date == null ) {

			return null;

		}

		return new SimpleDateFormat( pattern ).format( date );

	}

	public static Long diferencaEntreDatas(Date data1, Date data2) {

		LocalDate localDate1 = data1.toInstant().atZone( ZoneId.systemDefault() ).toLocalDate();

		LocalDate localDate2 = data2.toInstant().atZone( ZoneId.systemDefault() ).toLocalDate();

		return Duration.between( localDate1.atTime( 0, 0 ), localDate2.atTime( 0, 0 ) ).toDays();
	}

	public static String formatToTimestamp(final Date date) {

		if( date == null ) {

			return null;

		}

		return new SimpleDateFormat( "dd/MM/yyyy HH:mm:ss" ).format( date );

	}

	public static Date hoje() {

		return new Date();

	}

	public static String dataHoraAtual() {

		return DateFormat.getDateTimeInstance( DateFormat.MEDIUM, DateFormat.MEDIUM, new Locale( "pt", "BR" ) ).format( new Date() );

	}

	public static Date converterDateFimDia(Date data) {

		final Calendar cal = Calendar.getInstance();

		cal.setTime( data );

		cal.set( Calendar.HOUR_OF_DAY, 23 );

		cal.set( Calendar.MINUTE, 59 );

		cal.set( Calendar.SECOND, 59 );

		return cal.getTime();

	}

	public static Date converterDateInicioDia(Date data) {

		final Calendar cal = Calendar.getInstance();

		cal.setTime( data );

		cal.set( Calendar.HOUR_OF_DAY, 0 );

		cal.set( Calendar.MINUTE, 0 );

		cal.set( Calendar.SECOND, 0 );

		cal.set( Calendar.MILLISECOND, 0 );

		return cal.getTime();

	}

	public static Date zerarHoraData(Date data){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(data);
		setHourCalendar(calendar, 0, 0, 0, 0);

		return calendar.getTime();
	}

	public static Date ultimaHoraData(Date data){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(data);
		setHourCalendar(calendar, 23, 59, 59, 999);

		return calendar.getTime();
	}

	public static void setHourCalendar(Calendar calendar, int hour, int minute, int second, int millesecond){
		calendar.set(Calendar.HOUR_OF_DAY, hour);
		calendar.set(Calendar.MINUTE, minute);
		calendar.set(Calendar.SECOND, second);
		calendar.set(Calendar.MILLISECOND, millesecond);
	}

	/**
	 * Retorna:<br/>
	 * -1: Se a data do primeiro argumento for menor que a data do segundo argumento.<br/>
	 * 0: Se a data do primeiro argumento for igual a data do segundo argumento.<br/>
	 * 1: Se a data do primeiro argumento for maior que a data do segundo argumento.<br/>
	 *
	 * @param date1 um Date
	 * @param date2 um Date
	 * @return Um Inteiro
	 */
	public static int compareDate(Date date1, Date date2){
		return compareDate(date1, date2, false);
	}

	/**
	 * Retorna:<br/>
	 * -1: Se a data do primeiro argumento for menor que a data do segundo argumento.<br/>
	 * 0: Se a data do primeiro argumento for igual a data do segundo argumento.<br/>
	 * 1: Se a data do primeiro argumento for maior que a data do segundo argumento.<br/>
	 *
	 * @param date1 um Date
	 * @param date2 um Date
	 * @param considerarHoras um boolean
	 * @return Um Inteiro
	 */
	public static int compareDate(Date date1, Date date2, boolean considerarHoras){
		if(!considerarHoras){
			date1 = zerarHoraData(date1);
			date2 = zerarHoraData(date2);
		}

		return date1.compareTo(date2);
	}

	public static LocalDateTime getLocalDateTime(Date date) {
		Instant instant = date.toInstant();
		return instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
	}

	public static Calendar getCalendarDate(Date data) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(data);
		return calendar;
	}
	public static String getStringHorario(Calendar calendar) {
		return (calendar.get(Calendar.HOUR_OF_DAY) < 10 ? "0" + calendar.get(Calendar.HOUR_OF_DAY) : calendar.get(Calendar.HOUR_OF_DAY))
				+ ":"
				+ (calendar.get(Calendar.MINUTE) == 0 ? "00" : calendar.get(Calendar.MINUTE));
	}

	public static String getStringData(Date data) {
		Calendar calendar = getCalendarDate(data);
		int dia = calendar.get(Calendar.DATE);
		int mes = calendar.get(Calendar.MONTH) + 1;
		int ano = calendar.get(Calendar.YEAR);

		return (dia < 10 ? "0" + dia : dia) + "/" + (mes < 10 ? "0" + mes : mes) + "/" + ano;
	}
}
