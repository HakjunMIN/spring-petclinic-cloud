package org.springframework.samples.petclinic.aspects;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

import org.springframework.jmx.export.annotation.ManagedAttribute;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.jmx.export.annotation.ManagedResource;
import org.springframework.util.StopWatch;

/**
 * Simple AspectJ aspect that monitors call count and call invocation time.
 * Implements the CallMonitor management interface.
 *
 * @author Rob Harrop
 * @author Juergen Hoeller
 * @since 2.5
 */
@ManagedResource("petclinic:type=CallMonitor")
@Aspect
public class CallMonitoringAspect {

	private boolean isEnabled = true;

	private int callCount = 0;

	private long accumulatedCallTime = 0;


	@ManagedAttribute
	public void setEnabled(boolean enabled) {
		isEnabled = enabled;
	***REMOVED***

	@ManagedAttribute
	public boolean isEnabled() {
		return isEnabled;
	***REMOVED***

	@ManagedOperation
	public void reset() {
		this.callCount = 0;
		this.accumulatedCallTime = 0;
	***REMOVED***

	@ManagedAttribute
	public int getCallCount() {
		return callCount;
	***REMOVED***

	@ManagedAttribute
	public long getCallTime() {
		return (this.callCount ***REMOVED*** 0 ? this.accumulatedCallTime / this.callCount : 0);
	***REMOVED***


	@Around("within(@org.springframework.stereotype.Service *)")
	public Object invoke(ProceedingJoinPoint joinPoint) throws Throwable {
		if (this.isEnabled) {
			StopWatch sw = new StopWatch(joinPoint.toShortString());

			sw.start("invoke");
			try {
				return joinPoint.proceed();
			***REMOVED***
			finally {
				sw.stop();
				synchronized (this) {
					this.callCount++;
					this.accumulatedCallTime += sw.getTotalTimeMillis();
				***REMOVED***
			***REMOVED***
		***REMOVED***

		else {
			return joinPoint.proceed();
		***REMOVED***
	***REMOVED***

***REMOVED***
