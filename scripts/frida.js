/*
 * Script name   : frida.js
 * Description   : Frida script for preventing exit and extracting shared preferences
 * Author        : Harvey Lelliott (@flip-dots)
 * Date          : 23/03/26
 * 
 * License       : MIT
 * Revision      : 1.0.0
 *
 * This script is based off https://codeshare.frida.re/@ninjadiary/frinja---sharedpreferences/
 * but with additional code to prevent the anti-tamper mechanism from killing the app.
*/

setImmediate(function() {
    Java.perform(function() {
        var System = Java.use('java.lang.System');
        var Process = Java.use('android.os.Process');

        // Stop System.exit()
        System.exit.implementation = function(code) {
            console.log("[!] Intercepted exit (" + code + ")");
        };

        // Stop Process.killProcess()
        Process.killProcess.implementation = function(pid) {
            console.log("[!] Intercepted killProcess for PID: " + pid);
        };
    });
});

setImmediate(function() {
	Java.perform(function() {
		var contextWrapper = Java.use("android.content.ContextWrapper");
		contextWrapper.getSharedPreferences.overload('java.lang.String', 'int').implementation = function(var0, var1) {
			console.log("[*] getSharedPreferences called with name: " + var0 + " and mode: " + var1 + "\n");
			var sharedPreferences = this.getSharedPreferences(var0, var1);
			return sharedPreferences;
		};

		var sharedPreferencesEditor = Java.use("android.app.SharedPreferencesImpl$EditorImpl");
		sharedPreferencesEditor.putString.overload('java.lang.String', 'java.lang.String').implementation = function(var0, var1) {
			console.log("[*] Added a new String value to SharedPreferences with key: " + var0 + " and value " + var1 + "\n");
			var editor = this.putString(var0, var1);
			return editor;
		}

		sharedPreferencesEditor.putBoolean.overload('java.lang.String', 'boolean').implementation = function(var0, var1) {
			console.log("[*] Added a new boolean value to SharedPreferences with key: " + var0 + " and value " + var1 + "\n");
			var editor = this.putBoolean(var0, var1);
			return editor;
		}

		sharedPreferencesEditor.putFloat.overload('java.lang.String', 'float').implementation = function(var0, var1) {
			console.log("[*] Added a new float value to SharedPreferences with key: " + var0 + " and value " + var1 + "\n");
			var editor = this.putFloat(var0, var1);
			return editor;
		}

		sharedPreferencesEditor.putInt.overload('java.lang.String', 'int').implementation = function(var0, var1) {
			console.log("[*] [*] Added a new int value to SharedPreferences with key: " + var0 + " and value " + var1 + "\n");
			var editor = this.putInt(var0, var1);
			return editor;
		}

		sharedPreferencesEditor.putLong.overload('java.lang.String', 'long').implementation = function(var0, var1) {
			console.log("[*] Added a new long value to SharedPreferences with key: " + var0 + " and value " + var1 + "\n");
			var editor = this.putLong(var0, var1);
			return editor;
		}

		sharedPreferencesEditor.putStringSet.overload('java.lang.String', 'java.util.Set').implementation = function(var0, var1) {
			console.log("[*] Added a new string set to SharedPreferences with key: " + var0 + " and value " + var1 + "\n");
			var editor = this.putStringSet(var0, var1);
			return editor;
		}

		var sharedPreferences = Java.use("android.app.SharedPreferencesImpl");
		sharedPreferences.getString.overload('java.lang.String', 'java.lang.String').implementation = function(var0, var1) {
			console.log("[*] Getting string value from SharedPreferences with key: " + var0 + " and value " + var1 + "\n");
			var stringVal = this.getString(var0, var1);
			return stringVal;
		}
	});
});