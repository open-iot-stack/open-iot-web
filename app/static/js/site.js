/**
 * Created by nolan on 6/13/15.
 */
$(document).foundation();

function convertToTime(unixTime){
                var date = new Date(unixTime*1000);
                var iso = date.toISOString().match(/(\d{2}:\d{2}:\d{2})/);
    return iso[0];
}