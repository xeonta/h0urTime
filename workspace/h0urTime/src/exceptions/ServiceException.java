package exceptions;

public class ServiceException extends Exception {

	private static final long serialVersionUID = 1L;

	public ServiceException() {
		this("Servicefehler");
	}

	public ServiceException(String message) {
		super(message);
	}

	public ServiceException(Throwable cause) {
		super(cause);
	}

	public ServiceException(String message, Throwable cause) {
		super(message, cause);
	}

	public ServiceException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
	
	public String toJSON() {
		String tmp = "{ \"Error\": { \"errorMessage\": \"";
		tmp += this.getLocalizedMessage();
		tmp += "\", \"subErrorMessage\": ";
		if (this.getCause() == null) 
			tmp += "null";
		else 
			tmp += "\"" + this.getCause().getLocalizedMessage() + "\"";
		tmp += "}}";
		
		return tmp;
	}

}
