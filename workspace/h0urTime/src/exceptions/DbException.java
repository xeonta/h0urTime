package exceptions;

public class DbException extends Exception {

	private static final long serialVersionUID = 1L;

	public DbException() {
		this("DB Error");
	}
	
	public DbException(String message) {
		this(message, null);
	}

	public DbException(Throwable cause) {
		super(cause);
	}
	
	public DbException(String message, Throwable cause) {
		super(message, cause);
	}

	public DbException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
}
